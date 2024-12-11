export interface ProjectStats {
  weight?: string;
  cost?: string;
  'found-component'?: string;
  microcontroller?: string;
  keywords?: string[];
}

export interface ProjectDescription {
  short: string;
}

export interface ProjectAbout {
  description: ProjectDescription;
  stats: ProjectStats;
}

export interface ProjectPage {
  id: string;
  title: string;
  path: string;
  parentId?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  gifUrl: string;
  imageUrl: string;
  detailUrl: string;
  markdownPath: string;
  pages: ProjectPage[];
  about?: ProjectAbout;
}