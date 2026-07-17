import { motion } from 'framer-motion';

const torrents = [
  { name: 'ubuntu-24.04-desktop-amd64.iso', size: '5.7 GB', progress: 100, speed: '0 B/s', seeds: 142, peers: 34, status: 'Seeding', color: '#34d399' },
  { name: 'archlinux-2025.07-x86_64.iso', size: '3.2 GB', progress: 78, speed: '12.4 MB/s', seeds: 89, peers: 12, status: 'Downloading', color: '#60a5fa' },
  { name: 'debian-12-netinst-amd64.iso', size: '1.8 GB', progress: 45, speed: '8.7 MB/s', seeds: 234, peers: 56, status: 'Downloading', color: '#60a5fa' },
  { name: 'fedora-workstation-40-x86_64.iso', size: '4.1 GB', progress: 100, speed: '0 B/s', seeds: 67, peers: 8, status: 'Seeding', color: '#34d399' },
  { name: 'pop-os_24.04_amd64_intel_57.iso', size: '4.8 GB', progress: 23, speed: '5.2 MB/s', seeds: 45, peers: 19, status: 'Downloading', color: '#60a5fa' },
  { name: 'manjaro-xfce-25.2-minimal.iso', size: '2.9 GB', progress: 100, speed: '0 B/s', seeds: 31, peers: 3, status: 'Seeding', color: '#34d399' },
];

export default function TorrentDemo() {
  const active = torrents.filter((t) => t.status === 'Downloading').length;
  const totalSpeed = torrents
    .filter((t) => t.status === 'Downloading')
    .reduce((acc, t) => acc + parseInt(t.speed.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#60a5fa]/10 border border-[#60a5fa]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#60a5fa]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">VoidTorrent</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v2.4.1</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[var(--color-text-muted)]">
            <span className="text-green-400 font-medium">{active}</span> active
          </span>
          <span className="text-[var(--color-text-muted)]">
            ↓ <span className="text-white font-medium">{totalSpeed} MB/s</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
            VPN Active
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left py-3 px-5 text-[var(--color-text-muted)] font-medium tracking-wider">Name</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Size</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Progress</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Speed</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Seeds</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Peers</th>
              <th className="text-right py-3 px-6 text-[var(--color-text-muted)] font-medium tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {torrents.map((t, i) => (
              <motion.tr
                key={t.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2">
                      {t.status === 'Seeding' ? (
                        <path d="M12 2v20M2 12h20" />
                      ) : (
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      )}
                    </svg>
                    <span className="text-white truncate max-w-[220px]">{t.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-[var(--color-text-muted)]">{t.size}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: t.progress === 100 ? '#34d399' : '#60a5fa' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.progress}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 }}
                      />
                    </div>
                    <span className="text-[var(--color-text-muted)] w-8 text-right font-mono">{t.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-[var(--color-text-muted)] font-mono">{t.speed}</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-green-400">{t.seeds}</span>
                </td>
                <td className="py-3 px-4 text-right text-[var(--color-text-muted)]">{t.peers}</td>
                <td className="py-3 px-6 text-right">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    t.status === 'Seeding'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span>↓ 26.3 MB/s</span>
          <span>↑ 4.1 MB/s</span>
          <span>568 peers connected</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            DHT: Connected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            PEX: Active
          </span>
        </div>
      </div>
    </div>
  );
}
