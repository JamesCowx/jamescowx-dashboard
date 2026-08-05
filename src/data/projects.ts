import projectsData from './projects.json';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  tech: string[];
  sourceUrl: string;
  siteUrl?: string;
  featured: boolean;
  demoType: string;
}

export const projects: Project[] = projectsData.sort((a, b) => b.id - a.id);
