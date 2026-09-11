export function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-indigo-400/40 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-pink-400/35 blur-3xl animate-blob-delayed" />
      <div className="absolute top-2/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky-400/40 blur-3xl animate-blob-slow" />
      <div className="absolute -bottom-40 right-1/4 w-[32rem] h-[32rem] rounded-full bg-violet-400/30 blur-3xl animate-blob-delayed" />
      <div className="absolute top-1/4 left-1/2 w-[22rem] h-[22rem] rounded-full bg-emerald-300/30 blur-3xl animate-blob-slow" />
    </div>
  );
}