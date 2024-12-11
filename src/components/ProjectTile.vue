<script setup lang="ts">
import type { Project } from '../types';
defineProps<{project: Project}>();
</script>

<template>
<div class="project-tile"><img :src="project.gifUrl" :alt="project.title" class="project-gif"></div>
</template>

<style scoped>
.project-tile{aspect-ratio:1/1;background:#000;overflow:hidden;cursor:pointer;position:relative;line-height:0;display:block}
.project-gif{width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;display:block}
.project-tile:hover .project-gif{transform:scale(1.05)}
</style>