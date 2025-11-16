import { ProfileData, Skill, Project, ExperienceItem, Service } from './types';
import { WebAppIcon, StrategyIcon, LeadershipIcon } from './components/icons/Icons';

export const profileData: ProfileData = {
  name: 'Saiful Alam Rafi',
  title: 'Entrepreneur & Software Developer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80&grayscale=100',
  bio: 'Multifaceted professional combining entrepreneurial vision with software development expertise. Passionate about building innovative solutions, leading projects, and driving digital marketing strategies.',
  longBio: `As a dynamic professional with a unique blend of technical and business acumen, I operate at the intersection of entrepreneurship, software development, and digital marketing. My journey involves not just building robust applications but also planning successful events, leading cross-functional teams, and delivering exceptional service from concept to completion.

I excel at identifying market needs and translating them into tangible, high-impact digital products. Whether I'm architecting a new software solution, crafting a digital marketing campaign, or managing a complex project, my goal is to drive growth and create value.

I am a strategic thinker and a hands-on leader, committed to continuous learning and pushing the boundaries of what's possible. Born on March 4th, 1999, and hailing from Bangladesh, I bring a global perspective and a rich cultural background to my work. Let's connect and build something amazing together.`,
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  }
};

export const skillsData: Skill[] = [
    { name: 'React', value: 95, description: 'Building complex, scalable user interfaces with a component-based architecture.' },
    { name: 'TypeScript', value: 90, description: 'Enhancing JavaScript with static types for more robust and maintainable code.' },
    { name: 'JavaScript', value: 98, description: 'Core language proficiency, including modern ES6+ features and asynchronous patterns.' },
    { name: 'Next.js', value: 85, description: 'Developing performant, server-rendered React applications with a focus on SEO.' },
    { name: 'Project Mgmt', value: 88, description: 'Leading agile teams, managing project lifecycles, and ensuring timely delivery.' },
    { name: 'Digital Mktg', value: 80, description: 'Crafting and executing data-driven marketing strategies to increase engagement and reach.' },
    { name: 'UI/UX Design', value: 75, description: 'Translating user needs into intuitive and visually appealing interface designs.' },
    { name: 'Node.js', value: 70, description: 'Building server-side applications and APIs for full-stack development.' },
    { name: 'Event Planning', value: 82, description: 'Organizing and executing successful events from concept to completion.' },
];

export const projectsData: Project[] = [
  { 
    id: 1, 
    title: 'DeFi Analytics Dashboard', 
    description: 'A comprehensive platform for tracking and analyzing decentralized finance assets, providing real-time data visualization and portfolio management.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    tags: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#'
  },
  { 
    id: 2, 
    title: 'E-commerce Marketplace', 
    description: 'A full-stack e-commerce solution with a custom CMS, payment gateway integration, and a server-side rendered storefront for optimal performance.',
    image: 'https://images.unsplash.com/photo-1554224155-8d044b4a2533?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    tags: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
    liveUrl: '#',
  },
  { 
    id: 3, 
    title: 'Interactive 3D Product Configurator', 
    description: 'A web-based tool allowing users to customize products in a 3D space, with real-time rendering and state management using Three.js and Redux.',
    image: 'https://images.unsplash.com/photo-1655721533533-c174358a5312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    tags: ['Three.js', 'React', 'Redux', 'Styled Components'],
    liveUrl: '#',
    repoUrl: '#'
  },
   { 
    id: 4, 
    title: 'SaaS Collaboration Tool', 
    description: 'A real-time collaboration platform for teams, featuring shared workspaces, live document editing, and integrated chat functionalities using WebSockets.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    tags: ['React', 'Firebase', 'WebSockets', 'Material-UI'],
    repoUrl: '#'
  },
];

export const servicesData: Service[] = [
  {
    icon: WebAppIcon,
    title: 'Software Development',
    description: 'Building responsive and scalable web applications with a focus on user experience and performance.',
  },
  {
    icon: StrategyIcon,
    title: 'Digital Marketing',
    description: 'Crafting data-driven marketing strategies to boost online presence, engagement, and conversions.',
  },
  {
    icon: LeadershipIcon,
    title: 'Project Leadership',
    description: 'Leading agile teams through the full project lifecycle to deliver high-quality products on time and within budget.',
  },
];

const innovatechLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE0MTQxNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4IDggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iI0EwQTBBMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiIGZpbGw9IiNFMUUxRTEiLz48L3N2Zz4=`;
const creativeLabsLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE0MTQxNCI+PHBhdGggZD0iTTEyIDJDOS4yNCAyIDcgNC4yNCA3IDd2MWMwIDIuNzYgMi4yNCA1IDUgNWgxYzIuNzYgMCA1LTIuMjQgNS01VjBjMC0yLjc2LTIuMjQtNS01LTUiIGZpbGw9IiNBMEEwQTAiLz48cGF0aCBkPSJNNiAxOGMwIDEuMS45IDIgMiAyaDhjMS4xIDAgMi0uOSAyLTJ2LTNoLTEyVjE4eiIgZmlsbD0iI0UxRTFFMSIvPjwvc3ZnPg==`;
const digitalStartLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE0MTQxNCI+PHBhdGggZD0iTTQgMmgxNmMxLjEgMCAyIC45IDIgMnYxNmMwIDEuMS0uOSAyLTIgMkg0Yy0xLjEgMC0yLS45LTItMlY0YzAtMS4xLjktMiAyLTJ6bTggOWwtNCA0aDhMOCAxMnoiIGZpbGw9IiNFMUUxRTEiLz48L3N2Zz4=`;

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: 'Project Leader & Developer',
    company: 'Innovatech Solutions',
    duration: '2020 - Present',
    description: [
      'Led cross-functional teams in the development of a design system in React, increasing development velocity by 30%.',
      'Architected and implemented the frontend for a high-traffic SaaS application using Next.js, resulting in a 50% improvement in load times.',
      'Mentored junior engineers, managed project timelines, and established best practices for agile development.',
    ],
    logo: innovatechLogo
  },
  {
    id: 2,
    role: 'Digital Marketer & Frontend Developer',
    company: 'Creative Labs',
    duration: '2017 - 2020',
    description: [
      'Developed and maintained client-facing marketing websites, integrating analytics and SEO best practices.',
      'Executed successful digital marketing campaigns across multiple channels, increasing user engagement by 40%.',
      'Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect, responsive user interfaces.',
    ],
    logo: creativeLabsLogo
  },
    {
    id: 3,
    role: 'Event Planner & Service Coordinator',
    company: 'Digital Start LLC',
    duration: '2015 - 2017',
    description: [
      'Organized and executed corporate events, managing budgets, vendors, and logistics from start to finish.',
      'Assisted in building responsive landing pages and email templates for event promotion.',
      'Provided exceptional service to clients and stakeholders, ensuring high satisfaction rates.',
    ],
    logo: digitalStartLogo
  },
];