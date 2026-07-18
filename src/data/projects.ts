export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  tech: string[];
  image: string;
  sourceUrl: string;
  siteUrl?: string;
  featured: boolean;
  demoType: string;
}

export const projects: Project[] = [
  {
    id: 31, title: 'VoidTorrent',
    description: 'Privacy-focused torrent client with built-in VPN, darknet support, and bandwidth controls.',
    longDescription: 'VoidTorrent is a modern privacy-focused torrent client designed for both casual users and power users. It features a built-in VPN kill switch, encrypted peer-to-peer connections, darknet/I2P support, and a clean cross-platform UI. Built with performance and anonymity as core principles, VoidTorrent includes automatic tracker discovery, sequential downloading, and comprehensive bandwidth controls.',
    category: 'Web Apps', tags: ['Privacy', 'Torrent', 'P2P'],
    tech: ['Next.js', 'TypeScript', 'Rust', 'WebTorrent', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/projects/voidtorrent.png',
    sourceUrl: 'https://github.com/jamescowx/voidtorrent',
    siteUrl: 'https://jamescowx.github.io/voidtorrent/',
    featured: true,
    demoType: 'torrent',
  },
  {
    id: 33, title: 'CowxCrypto',
    description: 'Live cryptocurrency market intelligence with real-time prices, signals, and portfolio tracking.',
    longDescription: 'CowxCrypto delivers real-time cryptocurrency market data including live BTC/ETH prices, market cap, trending coins, top gainers and losers, and market dominance. It features buy/sell signal detection, whale trade tracking, and a comprehensive market overview dashboard. Built for traders who need fast, reliable market intelligence without the noise.',
    category: 'Web Apps', tags: ['Crypto', 'Market Data', 'Trading'],
    tech: ['Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/projects/cowxcrypto.png',
    sourceUrl: 'https://github.com/JamesCowx/CowxCrypto',
    siteUrl: 'https://cowxcrypto.onrender.com/',
    featured: true,
    demoType: 'cryptomarket',
  },
  {
    id: 34, title: 'CowxWallet',
    description: 'Secure cryptocurrency wallet with multi-coin support, transaction history, and portfolio tracking.',
    longDescription: 'CowxWallet is a modern cryptocurrency wallet designed for managing digital assets securely. It supports multiple blockchain networks, tracks transaction history, and provides real-time portfolio valuations. Built with a focus on security and usability, CowxWallet makes self-custody accessible to everyone.',
    category: 'Web Apps', tags: ['Crypto', 'Wallet', 'Blockchain'],
    tech: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/projects/cowxwallet.png',
    sourceUrl: 'https://cowxwallet.vercel.app/',
    siteUrl: 'https://cowxwallet.vercel.app/',
    featured: true,
    demoType: 'wallet',
  },
  {
    id: 32, title: 'CowxPass',
    description: 'Zero-knowledge password manager with AES-256 encryption, cloud sync, and autofill.',
    longDescription: 'CowxPass is a modern password manager built with security and simplicity in mind. Every password is encrypted with AES-256-GCM before it leaves your device — zero-knowledge architecture means even we cannot access your data. Features include cloud sync across devices, one-click autofill, a cryptographically random password generator, secure notes, and dark web breach monitoring. No bloat, no lock-in, just serious security made simple.',
    category: 'Web Apps', tags: ['Password Manager', 'Security', 'Encryption'],
    tech: ['Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/projects/cowxpass.png',
    sourceUrl: 'https://github.com/JamesCowx/cowxpass',
    siteUrl: 'https://cowxpass-u48k.onrender.com/',
    featured: true,
    demoType: 'vault',
  },
];

export const categories = ['All', 'Web Apps'];

