import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            StadiumSync
          </h1>
          <p className="text-xl text-neutral-400">
            The real-time crowd coordination engine for smart stadiums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link href="/user" className="group relative block p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-colors overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-2xl font-bold mb-2">User View</h2>
            <p className="text-neutral-500">Mobile PWA interface for fans. Smart routing, live alerts, and fast concessions.</p>
          </Link>
          
          <Link href="/admin" className="group relative block p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-neutral-500">Control center. Simulate crowd spikes, trigger alerts, and broadcast real-time updates.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
