import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';

// POST /api/stripe/webhook - Handles Stripe subscription events
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let event: any;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await connectToDatabase();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data?.object;
        const userId = session?.client_reference_id || session?.metadata?.userId;
        const plan = session?.metadata?.plan || 'pro';

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            isPro: true,
            plan,
            stripeCustomerId: session.customer,
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data?.object;
        const customerId = subscription?.customer;

        if (customerId) {
          await User.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { isPro: false, plan: 'free' }
          );
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[stripe webhook]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
