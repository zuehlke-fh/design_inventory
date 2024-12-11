import { ref } from 'vue';
import type { Project } from '../types';
import { projects as projectsData } from '../data/projects';

export function useProjects() {
  const projects = ref<Project[]>(projectsData);

  return {
    projects
  };
}