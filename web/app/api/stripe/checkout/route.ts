import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse } from '@atlas/types';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// POST /api/stripe/checkout - Create a Stripe Checkout Session
export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized. Please sign in to upgrade.' },
        { status: 401 }
      );
    }

    const { plan = 'pro', successUrl, cancelUrl } = await req.json();

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const finalSuccessUrl = successUrl || `${origin}/dashboard?subscription=success`;
    const finalCancelUrl = cancelUrl || `${origin}/pricing?subscription=cancelled`;

    if (!STRIPE_SECRET_KEY) {
      // In development or when Stripe key is not configured, simulate successful checkout redirect
      console.warn('[stripe] STRIPE_SECRET_KEY not provided. Returning development sandbox URL.');
      return NextResponse.json<ApiResponse<{ url: string }>>({
        success: true,
        data: {
          url: `${finalSuccessUrl}&tier=${plan}&mock=true`,
        },
      });
    }

    // Call Stripe API directly via standard REST fetch to avoid bulky sdk dependencies
    const params = new URLSearchParams();
    params.append('payment_method_types[]', 'card');
    params.append('mode', 'subscription');
    params.append('customer_email', authUser.email);
    params.append('client_reference_id', authUser.userId);
    params.append('success_url', finalSuccessUrl);
    params.append('cancel_url', finalCancelUrl);
    params.append('metadata[userId]', authUser.userId);
    params.append('metadata[plan]', plan);

    const priceMap: Record<string, number> = {
      plus: 900,
      pro: 1900,
      ultra: 4900,
    };
    const unitAmount = priceMap[plan] || 1900;

    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', `Atlas ${plan.toUpperCase()} Plan`);
    params.append('line_items[0][price_data][product_data][description]', `Unlimited AI Voice Mentors & Live Visual Companion`);
    params.append('line_items[0][price_data][unit_amount]', String(unitAmount));
    params.append('line_items[0][price_data][recurring][interval]', 'month');
    params.append('line_items[0][quantity]', '1');

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      throw new Error(session.error?.message || 'Stripe API checkout failure');
    }

    return NextResponse.json<ApiResponse<{ url: string }>>({
      success: true,
      data: { url: session.url },
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
