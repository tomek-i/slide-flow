'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Presentation as PresentationIcon, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import type { Slide } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AiSuggestions } from '@/components/ai-suggestions';
import { cn } from '@/lib/utils';

const initialSlides: Slide[] = [
  {
    id: '1',
    title: 'From Idea to Prototype',
    content: 'A guide to using **Firebase Studio** for rapid development.',
  },
  {
    id: '2',
    title: 'What is Firebase Studio?',
    content: 'An *AI-assisted* development environment to quickly build and deploy web application prototypes.',
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
    title: 'Why Not Use Prototype Code for Production?',
    content: "A prototype is for `learning` and `validation`. It's not production code. Use the insights gained to build a robust V1.\n\n- **Scalability:** Prototypes aren't built for large user loads.\n- **Security:** Production apps need robust security measures.\n  - User authentication\n  - Data validation\n- **Maintainability:** Production code needs to be clean and well-documented.",
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

  const moveSlide = (id: string, direction: 'up' | 'down') => {
    const fromIndex = slides.findIndex(s => s.id === id);
    if (fromIndex === -1) return;

    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= slides.length) return;

    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    setSlides(newSlides);
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
                      className={cn("w-full justify-start text-left h-auto py-3 pr-16", slide.id === activeSlideId && "bg-muted hover:bg-muted")}
                      onClick={() => setActiveSlideId(slide.id)}
                    >
                      <span className="font-semibold text-primary mr-3">{index + 1}.</span>
                      <span className="truncate flex-1">{slide.title}</span>
                    </Button>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-background">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSlide(slide.id, 'up')} disabled={index === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSlide(slide.id, 'down')} disabled={index === slides.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
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
                  topic={activeSlide.title}
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
                    placeholder="Slide Content... (Markdown is supported!)"
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
