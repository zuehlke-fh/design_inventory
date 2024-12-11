# Installation Guide

Follow these steps to integrate the component library into your project.

## Prerequisites

- Node.js 16 or higher
- Vue 3.x
- TypeScript 4.x (recommended)

## Installation Steps

1. Install the package:
   ```bash
   npm install @example/vue-components
   ```

2. Import styles:
   ```ts
   import '@example/vue-components/dist/style.css'
   ```

3. Register components:
   ```ts
   import { createApp } from 'vue'
   import { Button, Form } from '@example/vue-components'
   
   const app = createApp(App)
   app.component('VButton', Button)
   app.component('VForm', Form)
   ```