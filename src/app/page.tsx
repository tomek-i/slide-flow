'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Presentation as PresentationIcon, ArrowRight, Wand2 } from 'lucide-react';
import type { Slide } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AiSuggestions } from '@/components/ai-suggestions';

const initialSlides: Slide[] = [
  {
    id: '1',
    title: 'From Idea to Prototype',
    content: 'A guide to using Firebase Studio for rapid development.',
  },
  {
    id: '2',
    title: 'What is Firebase Studio?',
    content: 'An AI-assisted development environment to quickly build and deploy web application prototypes.',
  },
  {
    id: '3',
    title: 'The Core Workflow',
    content: '1. **Describe:** Explain your app idea in plain English.\n2. **Refine:** Collaborate with AI to tweak the UI and functionality.\n3. **Deploy:** Go live with one click on Firebase Hosting.',
  },
  {
    id: '4',
    title: 'AI-Powered Features',
    content: '- UI Generation\n- Component Scaffolding\n- Content Suggestions\n- Data Schema Creation',
  },
  {
    id: '5',
    title: 'Beyond the Prototype',
    content: "A prototype is for learning and validation. It's not production code. Use the insights gained to build a robust V1.",
  },
  {
    id: '6',
    title: 'Thank You',
    content: 'Questions?',
  },
];


export default function EditorPage() {
  const [slides, setSlides] = useLocalStorage<Slide[]>('slides', initialSlides);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (slides.length > 0 && !activeSlideId) {
      setActiveSlideId(slides[0].id);
    }
  }, [slides, activeSlideId]);
  
  const activeSlide = useMemo(() => slides.find(s => s.id === activeSlideId), [slides, activeSlideId]);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Start writing your content here.',
    };
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setActiveSlideId(newSlide.id);
  };

  const deleteSlide = (idToDelete: string) => {
    const updatedSlides = slides.filter(s => s.id !== idToDelete);
    setSlides(updatedSlides);
    if (activeSlideId === idToDelete) {
      setActiveSlideId(updatedSlides.length > 0 ? updatedSlides[0].id : null);
    }
  };

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    setSlides(slides.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-3">
          <PresentationIcon className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">SlideFlow</h1>
        </div>
        <Link href="/present" passHref>
          <Button>
            Present
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r">
          <div className="flex h-full flex-col">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Slides</h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-4 pt-0">
                {slides.map((slide, index) => (
                  <div key={slide.id} className="group relative">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => setActiveSlideId(slide.id)}
                      data-active={slide.id === activeSlideId}
                    >
                      <span className="font-semibold text-primary mr-3">{index + 1}.</span>
                      <span className="truncate flex-1">{slide.title}</span>
                    </Button>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this slide.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteSlide(slide.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 mt-auto border-t">
              <Button className="w-full" onClick={addSlide}>
                <Plus className="mr-2 h-4 w-4" />
                Add Slide
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-muted/40">
          {activeSlide ? (
            <Card className="h-full w-full shadow-lg">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Edit Slide</CardTitle>
                <AiSuggestions
                  topic="how to get from an idea to a prototype using firebase studio"
                  onSuggestionSelect={(content) => updateSlide(activeSlide.id, { content })}
                />
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div className="flex h-full flex-col gap-4">
                  <Input
                    placeholder="Slide Title"
                    value={activeSlide.title}
                    onChange={e => updateSlide(activeSlide.id, { title: e.target.value })}
                    className="text-lg font-semibold"
                  />
                  <Textarea
                    placeholder="Slide Content..."
                    value={activeSlide.content}
                    onChange={e => updateSlide(activeSlide.id, { content: e.target.value })}
                    className="flex-1 resize-none text-base"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>No slides to display.</p>
                <Button onClick={addSlide} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Create your first slide
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
