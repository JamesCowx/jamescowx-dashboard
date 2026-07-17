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
];

export const categories = ['All', 'Web Apps'];

