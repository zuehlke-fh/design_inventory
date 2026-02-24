import { ref, watch, type Ref } from 'vue';
import { marked } from 'marked';

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export function useMarkdown(path: Ref<string>) {
  const content = ref('');
  const headings = ref<Heading[]>([]);
  const title = ref('');
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  async function loadMarkdown() {
    if (!path.value) return;
    
    isLoading.value = true;
    error.value = null;
    headings.value = [];
    title.value = '';
    
    try {
      // Add base URL prefix if not present
      const fullPath = path.value.startsWith(baseUrl) ? path.value : `${baseUrl}${path.value}`;
      const response = await fetch(fullPath);
      if (!response.ok) throw new Error(`Failed to load markdown content: ${response.statusText}`);
      const text = await response.text();
      
      // Configure marked options
      marked.setOptions({
        gfm: true,
        breaks: true,
      });
      
      // Extract headings before rendering
      const tokens = marked.lexer(text);
      const extractedHeadings: Heading[] = [];
      
      tokens.forEach(token => {
        if (token.type === 'heading') {
          const id = token.text.toLowerCase().replace(/[^\w]+/g, '-');
          extractedHeadings.push({
            level: token.depth,
            text: token.text,
            id
          });
        }
      });
      
      headings.value = extractedHeadings;
      
      // Extract title (first h1)
      const titleHeading = extractedHeadings.find(h => h.level === 1);
      if (titleHeading) {
        title.value = titleHeading.text;
      }
      
      // Modify the renderer to add IDs to headings and handle image paths
      const renderer = new marked.Renderer();
      
      // Handle headings
      const originalHeadingRenderer = renderer.heading.bind(renderer);
      renderer.heading = (text, level, raw) => {
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        return originalHeadingRenderer(text, level, raw)
          .replace(/^<h(\d)>/, `<h$1 id="${id}">`);
      };

      // Handle images
      const originalImageRenderer = renderer.image.bind(renderer);
      renderer.image = (href, title, text) => {
        // Add base URL prefix to relative paths
        if (href && !href.startsWith('http') && !href.startsWith(baseUrl)) {
          href = href.startsWith('/') ? `${baseUrl}${href}` : `${baseUrl}/${href}`;
        }
        return originalImageRenderer(href, title, text);
      };
      
      // Render the markdown content
      content.value = await marked(text, { renderer });
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error');
      content.value = '';
    } finally {
      isLoading.value = false;
    }
  }

  watch(path, loadMarkdown, { immediate: true });

  return {
    content,
    headings,
    title,
    isLoading,
    error,
    reload: loadMarkdown
  };
}