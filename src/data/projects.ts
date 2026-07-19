import projectsData from './projects.json';

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

export const projects: Project[] = projectsData;

export const categories = ['All', 'Web Apps', 'Desktop Apps'];
