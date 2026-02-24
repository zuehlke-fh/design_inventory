import type { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { join } from 'path';

export function markdownServer(): Plugin {
  return {
    name: 'markdown-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/design_inventory/projects/') && req.url.includes('.md')) {
          try {
            // Remove any query parameters and base URL prefix
            const cleanUrl = req.url.split('?')[0].replace(/^\/design_inventory/, '');
            
            // Join with the public directory to get the absolute path
            const filePath = join(process.cwd(), 'public', cleanUrl);
            
            try {
              const content = readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'text/markdown');
              res.end(content);
            } catch (error) {
              console.error(`Error reading markdown file: ${filePath}`, error);
              res.statusCode = 404;
              res.end(`File not found: ${cleanUrl}`);
            }
          } catch (error) {
            console.error('Error in markdown server:', error);
            next(error);
          }
        } else {
          next();
        }
      });
    }
  };
}