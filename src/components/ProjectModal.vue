<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Project } from '../types';

const props = defineProps<{
  project: Project;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="emit('close')">&times;</button>
      <h2>{{ project.title }}</h2>
      <div class="image-container">
        <img :src="project.imageUrl" :alt="project.title" class="project-image">
      </div>
      <div class="content">
        <div class="description-section">
          <p class="description">{{ project.about?.description.short || project.description }}</p>
        </div>

        <div v-if="project.about?.stats" class="stats-section">
          <div class="stats-grid">
            <div class="stats-column">
              <div v-if="project.about.stats.weight" class="stat-item">
                <span class="stat-label">Weight:</span>
                <span class="stat-value">{{ project.about.stats.weight }}</span>
              </div>
              <div v-if="project.about.stats.cost" class="stat-item">
                <span class="stat-label">Cost:</span>
                <span class="stat-value">{{ project.about.stats.cost }}</span>
              </div>
            </div>
            <div class="stats-column">
              <div v-if="project.about.stats['found-component']" class="stat-item">
                <span class="stat-label">Found Component:</span>
                <span class="stat-value">{{ project.about.stats['found-component'] }}</span>
              </div>
              <div v-if="project.about.stats.microcontroller" class="stat-item">
                <span class="stat-label">Microcontroller:</span>
                <span class="stat-value">{{ project.about.stats.microcontroller }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="project.about.stats.keywords?.length" class="keywords">
            <span v-for="keyword in project.about.stats.keywords" 
                  :key="keyword" 
                  class="keyword">
              {{ keyword }}
            </span>
          </div>
        </div>

        <router-link :to="project.detailUrl" class="detail-link">
          Explore Full Project Documentation & Resources
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 60vw;
  height: 80vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: black;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 10;
}

.close-button:hover {
  background: #333;
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 1.5rem;
  line-height: 1.2;
  padding-right: 3rem;
}

.image-container {
  width: 100%;
  height: 25%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.content {
  padding: 2rem;
  flex-grow: 1;
  overflow-y: auto;
}

.description-section {
  margin-bottom: 3rem;
}

.description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  white-space: pre-line;
}

.stats-section {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 8px;
  margin-bottom: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 3rem;
}

.stats-column {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-label {
  font-weight: 500;
  color: #666;
  font-size: 0.85rem;
  letter-spacing: 0.01em;
}

.stat-value {
  color: #333;
  font-size: 1rem;
  font-weight: 500;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.keyword {
  background: #E6E6FA;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.detail-link {
  display: block;
  width: 100%;
  padding: 1.2rem;
  background: #E6E6FA;
  color: #333;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  margin-top: 2.5rem;
  border-radius: 12px;
}

.detail-link:hover {
  background: #D8D8FF;
  color: #000;
}

@media (max-width: 1024px) {
  .modal-content {
    width: 80vw;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 90vw;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .stats-column {
    gap: 2.5rem;
  }
  
  .stats-section {
    padding: 2rem;
  }
}
</style>