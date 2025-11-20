
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

export type View = 'home' | 'projects' | 'experience' | 'tracking' | 'contact';
