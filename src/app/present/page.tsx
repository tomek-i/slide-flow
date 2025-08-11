
'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Presentation } from '@/components/presentation';
import type { Slide, ContentSlide, IntroSlide } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const initialSlides: Slide[] = [
  {
    id: 'intro-1',
    type: 'intro',
    profile: {
      name: 'Tom Iwainski',
      title: 'Senior Software Engineer',
      company: 'SSW',
      bio: 'Full-stack engineer passionate about building scalable systems and mentoring junior devs.',
      techStack: ['C# .NET', 'TypeScript', 'Node.js', 'Python', 'etc.'],
      socials: {
        github: 'https://github.com/tomek-i',
        linkedin: 'https://www.linkedin.com/in/tomek-iw/',
        website: 'https://tomek.au',
      }
    },
  },
  {
    id: '1',
    type: 'content',
    title: 'From Idea to Prototype',
    content: 'A guide to using **Firebase Studio** for rapid development.',
  },
  {
    id: '2',
    type: 'content',
    title: 'What is Firebase Studio?',
    content: 'An *AI-assisted* development environment to quickly build and deploy web application prototypes.',
  },
  {
    id: '3',
    type: 'content',
    title: 'The Core Workflow',
    content: '1. **Describe:** Explain your app idea in plain English.\n2. **Refine:** Collaborate with AI to tweak the UI and functionality.\n3. **Deploy:** Go live with one click on Firebase Hosting.',
  },
  {
    id: '4',
    type: 'content',
    title: 'AI-Powered Features',
    content: '- UI Generation\n- Component Scaffolding\n- Content Suggestions\n- Data Schema Creation',
  },
  {
    id: '5',
    type: 'content',
    title: 'Beyond the Prototype',
    content: "A prototype is for `learning` and `validation`. It's not production code. Use the insights gained to build a robust V1.",
  },
  {
    id: '6',
    type: 'content',
    title: 'Thank You',
    content: 'Questions?',
  },
];


export default function PresentPage() {
  const [slides] = useLocalStorage<Slide[]>('slides', initialSlides);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
       <div className="flex h-screen w-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">No slides to present.</p>
      </div>
    )
  }

  return <Presentation slides={slides} />;
}
