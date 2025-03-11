import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const projectsDir = path.join(__dirname, '../public/projects');
const outputFile = path.join(__dirname, '../src/data/projects.ts');
const projectPrefix = 'project-documentation-';
const baseUrl = '/design_inventory'; // Hardcoded base URL for GitHub Pages

// Function to parse JSON with comments and trailing commas
function parseJSON(jsonString) {
  try {
    // Remove comments
    const noComments = jsonString.replace(/\/\/.*$/gm, '');
    
    // Fix trailing commas in arrays and objects
    const fixedTrailingCommas = noComments
      .replace(/,\s*]/g, ']')
      .replace(/,\s*}/g, '}');
    
    return JSON.parse(fixedTrailingCommas);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Return a default object if parsing fails
    return {
      description: {
        short: 'No description available (JSON parsing error)'
      },
      stats: {
        keywords: []
      }
    };
  }
}

// Function to fix image paths and links in markdown files
function fixMarkdownImagePaths(projectDir) {
  try {
    const readmeDir = path.join(projectsDir, projectDir, 'readme');
    if (!fs.existsSync(readmeDir)) return;
    
    const markdownFiles = getMarkdownFiles(readmeDir);
    
    markdownFiles.forEach(file => {
      const filePath = path.join(readmeDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix relative image paths
      // This regex matches markdown image syntax: ![alt text](image-path)
      const imageRegex = /!\[(.*?)\]\(((?!https?:\/\/|\/)[^)]+)\)/g;
      
      // Replace relative paths with absolute paths and convert to HTML img tags with styling
      content = content.replace(imageRegex, (match, alt, imgPath) => {
        // If path already starts with / or http, use that path
        if (imgPath.startsWith('/') || imgPath.startsWith('http')) {
          return `<img src="${baseUrl}${imgPath}" alt="${alt}" style="max-width: 100%; height: auto; max-height: 500px;" />`;
        }
        
        // Convert relative path to absolute path
        const absolutePath = `${baseUrl}/projects/${projectDir}/readme/${imgPath}`;
        return `<img src="${absolutePath}" alt="${alt}" style="max-width: 100%; height: auto; max-height: 500px;" />`;
      });
      
      // Also fix any existing absolute paths
      const absoluteImageRegex = /!\[(.*?)\]\((\/[^)]+)\)/g;
      content = content.replace(absoluteImageRegex, (match, alt, imgPath) => {
        return `<img src="${baseUrl}${imgPath}" alt="${alt}" style="max-width: 100%; height: auto; max-height: 500px;" />`;
      });
      
      // Fix markdown links to other markdown files
      // This regex matches markdown link syntax: [link text](file.md) but not [link text](http://...)
      const markdownLinkRegex = /\[(.*?)\]\(((?!https?:\/\/|\/)[^)]+\.md(?:#[^)]*)?)\)/g;
      
      content = content.replace(markdownLinkRegex, (match, text, mdPath) => {
        // Extract anchor if present
        let anchor = '';
        let cleanPath = mdPath;
        
        if (mdPath.includes('#')) {
          const parts = mdPath.split('#');
          cleanPath = parts[0];
          anchor = '#' + parts[1];
        }
        
        // Convert to router-link format for Vue
        // For example: [Construction](construction.md) -> [Construction](/project/1?page=construction)
        
        // Get the page ID from the filename
        const fileName = path.basename(cleanPath, '.md');
        const pageId = fileName.toLowerCase();
        
        // Get the project ID from the directory name
        const projectId = projectDir.startsWith(projectPrefix) 
          ? projectDir.substring(projectPrefix.length) 
          : projectDir;
        
        // Find the numeric ID from the projects.ts file (will be based on index)
        // Since we don't have access to the final ID yet, we'll use a placeholder
        // that we'll replace in a second pass
        return `[${text}](/project/PROJECTID?page=${pageId}${anchor})`;
      });
      
      // Fix absolute markdown links (starting with /)
      const absoluteMarkdownLinkRegex = /\[(.*?)\]\((\/[^)]+\.md(?:#[^)]*)?)\)/g;
      
      content = content.replace(absoluteMarkdownLinkRegex, (match, text, mdPath) => {
        // Extract the filename and anchor if present
        const fileName = path.basename(mdPath.split('#')[0], '.md');
        const pageId = fileName.toLowerCase();
        let anchor = '';
        
        if (mdPath.includes('#')) {
          anchor = '#' + mdPath.split('#')[1];
        }
        
        return `[${text}](/project/PROJECTID?page=${pageId}${anchor})`;
      });
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`Fixed image paths and links in ${filePath}`);
    });
  } catch (error) {
    console.error(`Error fixing markdown content for ${projectDir}:`, error);
  }
}

// Function to get the first image from a directory
function getFirstImage(imagesDir) {
  try {
    if (!fs.existsSync(imagesDir)) return null;
    
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });
    
    return imageFiles.length > 0 ? imageFiles[0] : null;
  } catch (error) {
    console.error(`Error getting images from ${imagesDir}:`, error);
    return null;
  }
}

// Function to get markdown files from a directory
function getMarkdownFiles(readmeDir) {
  try {
    if (!fs.existsSync(readmeDir)) return [];
    
    const files = fs.readdirSync(readmeDir);
    return files.filter(file => path.extname(file).toLowerCase() === '.md');
  } catch (error) {
    console.error(`Error getting markdown files from ${readmeDir}:`, error);
    return [];
  }
}

// Function to generate project pages from markdown files
function generatePages(projectPath, markdownFiles) {
  const pages = [];
  const relativePath = projectPath.replace(/^.*\/public/, '');
  
  markdownFiles.forEach((file, index) => {
    const fileName = path.basename(file, '.md');
    const id = fileName.toLowerCase() === 'readme' ? 'overview' : fileName.toLowerCase();
    const title = fileName === 'README' ? 'Overview' : fileName.charAt(0).toUpperCase() + fileName.slice(1);
    
    pages.push({
      id,
      title,
      path: `${relativePath}/readme/${file}`
    });
  });
  
  return pages;
}

// Function to generate a project object
function generateProject(projectDir, id) {
  const projectPath = path.join(projectsDir, projectDir);
  const aboutPath = path.join(projectPath, 'about.json');
  const imagesDir = path.join(projectPath, 'images');
  const readmeDir = path.join(projectPath, 'readme');
  
  // Skip if about.json doesn't exist
  if (!fs.existsSync(aboutPath)) {
    console.warn(`Skipping ${projectDir}: about.json not found`);
    return null;
  }
  
  try {
    // Read about.json
    const aboutJson = fs.readFileSync(aboutPath, 'utf8');
    const aboutData = parseJSON(aboutJson);
    
    // Get first image for preview
    const firstImage = getFirstImage(imagesDir);
    const imageUrl = firstImage ? `${baseUrl}/projects/${projectDir}/images/${firstImage}` : '';
    
    // Get markdown files
    const markdownFiles = getMarkdownFiles(readmeDir);
    const pages = generatePages(projectPath, markdownFiles);
    
    // Generate title from directory name
    let title = projectDir;
    if (projectDir.startsWith(projectPrefix)) {
      title = projectDir.substring(projectPrefix.length);
    }
    title = title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Generate description
    const description = aboutData.description?.short || 'No description available';
    
    return {
      id,
      title,
      description: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
      gifUrl: imageUrl,
      imageUrl: imageUrl,
      detailUrl: `${baseUrl}/project/${id}`,
      markdownPath: pages.length > 0 ? `${baseUrl}${pages[0].path}` : '',
      pages: pages.map(page => ({
        ...page,
        path: `${baseUrl}${page.path}`
      })),
      about: aboutData
    };
  } catch (error) {
    console.error(`Error processing ${projectDir}:`, error);
    return null;
  }
}

// Function to update project IDs in markdown links
function updateProjectIdsInMarkdownLinks(projectDirs) {
  // Create a mapping of project directory names to their IDs
  const projectIdMap = {};
  projectDirs.forEach((dir, index) => {
    projectIdMap[dir] = index + 1;
  });
  
  // Update all markdown files with the correct project IDs
  projectDirs.forEach(projectDir => {
    const readmeDir = path.join(projectsDir, projectDir, 'readme');
    if (!fs.existsSync(readmeDir)) return;
    
    const markdownFiles = getMarkdownFiles(readmeDir);
    
    markdownFiles.forEach(file => {
      const filePath = path.join(readmeDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace the PROJECTID placeholder with the actual project ID
      content = content.replace(/\/project\/PROJECTID/g, `${baseUrl}/project/${projectIdMap[projectDir]}`);
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
    });
  });
}

// Main function
function generateProjectsFile() {
  try {
    // Read projects directory
    const projectDirs = fs.readdirSync(projectsDir).filter(dir => {
      const stats = fs.statSync(path.join(projectsDir, dir));
      // Exclude placeholder projects and hidden directories
      return stats.isDirectory() && 
             !dir.startsWith('.') && 
             !['project1', 'project2', 'project3'].includes(dir);
    });
    
    // First pass: Fix image paths and add link placeholders
    projectDirs.forEach(dir => {
      fixMarkdownImagePaths(dir);
    });
    
    // Second pass: Update project IDs in markdown links
    updateProjectIdsInMarkdownLinks(projectDirs);
    
    // Generate projects
    const projects = [];
    projectDirs.forEach((dir, index) => {
      const project = generateProject(dir, index + 1);
      if (project) {
        projects.push(project);
      }
    });
    
    // Generate TypeScript file
    const tsContent = `import type { Project } from '../types/project';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
    
    // Write to file
    fs.writeFileSync(outputFile, tsContent);
    console.log(`Successfully generated ${outputFile} with ${projects.length} projects`);
  } catch (error) {
    console.error('Error generating projects file:', error);
  }
}

// Run the script
generateProjectsFile(); 