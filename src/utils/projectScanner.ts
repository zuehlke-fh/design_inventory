import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Project, ProjectPage } from '../types';

function scanProjectFolder(projectId: number): Project | null {
  const projectPath = join('public/projects', `project${projectId}`);
  
  if (!existsSync(projectPath)) return null;
  
  // Read about.json for project info
  const aboutPath = join(projectPath, 'about.json');
  if (!existsSync(aboutPath)) return null;
  
  const about = JSON.parse(readFileSync(aboutPath, 'utf-8'));
  
  // Scan for documentation pages
  const pages: ProjectPage[] = [];
  
  // Add README as overview
  const readmePath = join(projectPath, 'readme', 'README.md');
  if (existsSync(readmePath)) {
    pages.push({
      id: 'overview',
      title: 'Overview',
      path: `/projects/project${projectId}/readme/README.md`
    });
  }
  
  // Check for other markdown files in readme folder
  const readmeDir = join(projectPath, 'readme');
  if (existsSync(readmeDir)) {
    const readmeFiles = readdirSync(readmeDir);
    readmeFiles.forEach(file => {
      if (file === 'README.md') return;
      if (!file.endsWith('.md')) return;
      
      const id = file.replace('.md', '');
      pages.push({
        id,
        title: id.charAt(0).toUpperCase() + id.slice(1),
        path: `/projects/project${projectId}/readme/${file}`
      });
    });
  }
  
  return {
    id: projectId,
    title: about.title || `Project ${projectId}`,
    description: about.description || 'No description available',
    gifUrl: `/projects/project${projectId}/images/preview.gif`,
    imageUrl: `/projects/project${projectId}/images/header.jpg`,
    detailUrl: `/project/${projectId}`,
    markdownPath: `/projects/project${projectId}/readme/README.md`,
    pages
  };
}

export function scanProjects(): Project[] {
  const projects: Project[] = [];
  
  // Scan first 20 project folders
  for (let i = 1; i <= 20; i++) {
    const project = scanProjectFolder(i);
    if (project) {
      projects.push(project);
    }
  }
  
  return projects;
}