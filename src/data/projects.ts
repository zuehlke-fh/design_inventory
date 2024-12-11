import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: "Vue Component Library",
    description: "A comprehensive collection of reusable Vue.js components built with TypeScript",
    gifUrl: "/projects/project1/images/preview.gif",
    imageUrl: "/projects/project1/images/header.jpg",
    detailUrl: "/project/1",
    markdownPath: "/projects/project1/readme/README.md",
    pages: [
      {
        id: "overview",
        title: "Overview",
        path: "/projects/project1/readme/README.md"
      },
      {
        id: "installation",
        title: "Installation Guide",
        path: "/projects/project1/readme/installation.md"
      }
    ],
    about: {
      description: {
        short: "A modern, lightweight component library that provides a comprehensive collection of reusable Vue.js components built with TypeScript. Features 30+ production-ready components with customizable theming."
      },
      stats: {
        weight: "2.3 MB",
        cost: "Free",
        "found-component": "Vue.js Core",
        microcontroller: "N/A",
        keywords: [
          "Vue.js",
          "TypeScript",
          "Component Library",
          "UI/UX",
          "Open Source"
        ]
      }
    }
  },
  {
    id: 2,
    title: "GraphQL API Gateway",
    description: "A high-performance GraphQL API gateway that simplifies microservices integration",
    gifUrl: "/projects/project2/images/preview.gif",
    imageUrl: "/projects/project2/images/header.jpg",
    detailUrl: "/project/2",
    markdownPath: "/projects/project2/readme/README.md",
    pages: [
      {
        id: "overview",
        title: "Overview",
        path: "/projects/project2/readme/README.md"
      },
      {
        id: "architecture",
        title: "Architecture",
        path: "/projects/project2/readme/architecture.md"
      }
    ],
    about: {
      description: {
        short: "A high-performance GraphQL API gateway that unifies multiple microservices into a single endpoint, featuring automatic schema stitching and built-in authentication."
      },
      stats: {
        weight: "4.7 MB",
        cost: "Enterprise",
        "found-component": "Apollo Server",
        microcontroller: "N/A",
        keywords: [
          "GraphQL",
          "API Gateway",
          "Microservices",
          "Performance",
          "Security"
        ]
      }
    }
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "A modern real-time chat application built with WebSocket technology",
    gifUrl: "/projects/project3/images/preview.gif",
    imageUrl: "/projects/project3/images/header.jpg",
    detailUrl: "/project/3",
    markdownPath: "/projects/project3/readme/README.md",
    pages: [
      {
        id: "overview",
        title: "Overview",
        path: "/projects/project3/readme/README.md"
      },
      {
        id: "security",
        title: "Security",
        path: "/projects/project3/readme/security.md"
      }
    ],
    about: {
      description: {
        short: "A secure, scalable chat application featuring end-to-end encryption, group chats, and file sharing capabilities built with modern WebSocket technology."
      },
      stats: {
        weight: "3.8 MB",
        cost: "Freemium",
        "found-component": "Socket.io",
        microcontroller: "N/A",
        keywords: [
          "Real-time Chat",
          "WebSocket",
          "Encryption",
          "Scalability",
          "Cross-platform"
        ]
      }
    }
  }
];