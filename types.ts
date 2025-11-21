
import React from 'react';

export interface Skill {
    name: string;
    value: number;
    description?: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    repoUrl?: string;
}

export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    duration: string;
    description: string[];
    logo?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  longBio?: string;
  location?: string;
  email?: string;
  phone?: string;
  website?: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  }
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface Service {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export type View = 'home' | 'projects' | 'experience' | 'contact';

// New Types
export interface Startup {
    id: number;
    name: string;
    role: string;
    description: string;
    logo: string;
    status: 'Active' | 'Acquired' | 'Pivot';
    year: string;
    link?: string;
}

export interface Organization {
    id: number;
    name: string;
    logo: string;
    role: string;
    duration: string;
}

export interface FreelanceProject {
    id: number;
    title: string;
    client: string;
    outcome: string;
    serviceType: string;
    year: string;
}

export interface Education {
    id: number;
    degree: string;
    institution: string;
    year: string;
    description?: string;
}