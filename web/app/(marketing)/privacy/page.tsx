export default function PrivacyPage() {
  const sections = [
    {
      title: 'What we collect',
      body: 'Account information (name, email), session recordings and transcripts so mentors can learn from past calls, and basic usage analytics to improve the product.',
    },
    {
      title: 'How we use it',
      body: 'Voice sessions are processed to generate live visuals, debriefs, and flashcards. Session memory powers long-term context between calls. We never sell your personal data.',
    },
    {
      title: 'Voice & recordings',
      body: 'Audio is transmitted in real time to our voice engine and retained only as long as needed to deliver session summaries and memory, or until you delete it.',
    },
    {
      title: 'Your rights & deletion',
      body: 'You can export or permanently delete your account, session data, and memory at any time from your profile settings, or by contacting support@atlas.ai.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-500 mb-10">Last updated: September 2026</p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold text-slate-950 mb-1.5">{section.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
        <p className="text-sm text-slate-600 leading-relaxed">
          Questions? Email{' '}
          <a href="mailto:privacy@atlas.ai" className="font-semibold text-black underline">
            privacy@atlas.ai
          </a>
          .
        </p>
      </div>
    </div>
  );
}