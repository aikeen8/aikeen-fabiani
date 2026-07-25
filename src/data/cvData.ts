import type { PortfolioFolder } from '../types';

export const folderData: PortfolioFolder[] = [
  {
    id: 'profile',
    title: 'Unverified / Profile',
    color: 'bg-[#f4ebd0]',
    tabColor: 'bg-[#e63946]',
    heading: 'Kate Aikeen Fabiani',
    subheading: 'Web Developer',
    details: [
      'Web Developer experienced in React, TypeScript, Tailwind CSS, and REST APIs.',
      'Specialized in responsive UIs, backend integrations, and 3D geospatial mapping for smart city applications.'
    ]
  },
  {
    id: 'experience',
    title: 'Varnell Collection',
    color: 'bg-[#eae6df]',
    tabColor: 'bg-[#1d3557]',
    heading: 'Experience',
    items: [
      {
        title: 'Frontend Developer Intern',
        subtitle: 'Hiraya Technology Solutions, Inc.',
        date: 'Feb - May 2026',
        description: 'Developed a 3D interactive map interface rendering 10,000+ city structures using React, TypeScript, and MapLibre GL.',
        tags: ['React', 'TypeScript', 'MapLibre GL', 'Node.js', 'Tailwind CSS']
      }
    ]
  },
  {
    id: 'projects',
    title: 'Subject Drift',
    color: 'bg-[#e8e4d9]',
    tabColor: 'bg-[#2a9d8f]',
    heading: 'Selected Projects',
    items: [
      {
        title: "Darwin's Hardware",
        subtitle: 'Capstone Project - Programmer Lead',
        date: 'Jul - Nov 2025',
        description: 'E-commerce platform managing 1,500+ hardware products with real-time inventory automation.',
        tags: ['PHP', 'MySQL', 'Tailwind CSS']
      },
      {
        title: 'Compo',
        subtitle: 'Minimal Digital Workspace',
        date: 'May 2026',
        description: 'Productivity web application with rich-text editor, Pomodoro timer, PIN lock, and PWA offline sync.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PWA'],
        link: 'https://github.com/aikeen8/compo'
      }
    ]
  },
  {
    id: 'skills',
    title: 'Margin Events',
    color: 'bg-[#f1ece1]',
    tabColor: 'bg-[#e76f51]',
    heading: 'Skills & Education',
    details: [
      'Languages: JavaScript, TypeScript, Python, C#, PHP',
      'Frontend: React, Tailwind CSS, React Hook Form, Zod, MapLibre GL',
      'Backend & Databases: Node.js, Express.js, PostgreSQL, MySQL, Supabase, MongoDB',
      'Education: BS in Information Technology — STI College Fairview (Dean\'s Lister)'
    ]
  }
];