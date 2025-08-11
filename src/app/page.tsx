"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Trash2, Presentation as PresentationIcon, ArrowRight, GripVertical, User } from "lucide-react";
import { Reorder } from "framer-motion";
import type { Slide, ContentSlide, IntroSlide } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiSuggestions } from "@/components/ai-suggestions";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { initialSlides } from "@/data/slides";

export default function EditorPage() {
  const [slides, setSlides] = useLocalStorage<Slide[]>("slides", initialSlides);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (slides.length > 0 && !activeSlideId) {
      setActiveSlideId(slides[0].id);
    }
  }, [slides, activeSlideId]);

  const activeSlide = useMemo(() => slides.find((s) => s.id === activeSlideId), [slides, activeSlideId]);

  const addSlide = () => {
    const newSlide: ContentSlide = {
      id: Date.now().toString(),
      type: "content",
      title: "New Slide",
      content: "Start writing your content here.",
    };
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setActiveSlideId(newSlide.id);
  };

  const deleteSlide = (idToDelete: string) => {
    const updatedSlides = slides.filter((s) => s.id !== idToDelete);
    setSlides(updatedSlides);
    if (activeSlideId === idToDelete) {
      setActiveSlideId(updatedSlides.length > 0 ? updatedSlides[0].id : null);
    }
  };

  const updateSlide = useCallback(
    (id: string, updates: Partial<Slide>) => {
      setSlides(
        slides.map((s) => {
          if (s.id !== id) return s;
          if (s.type === "intro") {
            // Handle intro slide updates
            const introUpdates = updates as Partial<IntroSlide>;
            if (introUpdates.profile) {
              return {
                ...s,
                profile: { ...s.profile, ...introUpdates.profile },
              } as IntroSlide;
            }
            return { ...s, ...updates } as IntroSlide;
          }
          if (s.type === "content") {
            // Handle content slide updates
            return { ...s, ...updates } as ContentSlide;
          }
          return s;
        })
      );
    },
    [slides, setSlides]
  );

  if (!isMounted) {
    return null; // or a loading spinner
  }

  const renderEditView = () => {
    if (!activeSlide) return null;

    if (activeSlide.type === "intro") {
      const slide = activeSlide as IntroSlide;
      return (
        <Card className="h-full w-full shadow-lg">
          <CardHeader>
            <CardTitle>Edit Intro Slide</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)]">
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={slide.profile.name}
                      onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, name: e.target.value } })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Senior Software Engineer"
                      value={slide.profile.title}
                      onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, title: e.target.value } })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Open Dev Co."
                    value={slide.profile.company}
                    onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, company: e.target.value } })}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Full-stack engineer..."
                    value={slide.profile.bio}
                    onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, bio: e.target.value } })}
                  />
                </div>
                <div>
                  <Label htmlFor="tech-stack">Tech Stack (comma-separated)</Label>
                  <Input
                    id="tech-stack"
                    placeholder="JavaScript, React..."
                    value={slide.profile.techStack.join(", ")}
                    onChange={(e) =>
                      updateSlide(slide.id, {
                        profile: { ...slide.profile, techStack: e.target.value.split(",").map((s) => s.trim()) },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/janedoe"
                      value={slide.profile.socials.github}
                      onChange={(e) =>
                        updateSlide(slide.id, {
                          profile: { ...slide.profile, socials: { ...slide.profile.socials, github: e.target.value } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/janedoe"
                      value={slide.profile.socials.linkedin}
                      onChange={(e) =>
                        updateSlide(slide.id, {
                          profile: {
                            ...slide.profile,
                            socials: { ...slide.profile.socials, linkedin: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Site URL</Label>
                    <Input
                      id="website"
                      placeholder="https://janedoe.dev"
                      value={slide.profile.socials.website}
                      onChange={(e) =>
                        updateSlide(slide.id, {
                          profile: { ...slide.profile, socials: { ...slide.profile.socials, website: e.target.value } },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={slide.profile.location}
                    onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, location: e.target.value } })}
                  />
                </div>
                <div>
                  <Label htmlFor="fun-fact">Fun Fact</Label>
                  <Textarea
                    id="fun-fact"
                    placeholder="Ran a coding blog..."
                    value={slide.profile.funFact}
                    onChange={(e) => updateSlide(slide.id, { profile: { ...slide.profile, funFact: e.target.value } })}
                  />
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      );
    }

    const slide = activeSlide as ContentSlide;
    return (
      <Card className="h-full w-full shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Edit Slide</CardTitle>
          <AiSuggestions topic={slide.title} onSuggestionSelect={(content) => updateSlide(slide.id, { content })} />
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <div className="flex h-full flex-col gap-4">
            <Input
              placeholder="Slide Title"
              value={slide.title}
              onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
              className="text-lg font-semibold"
            />
            <Textarea
              placeholder="Slide Content... (Markdown is supported!)"
              value={slide.content}
              onChange={(e) => updateSlide(slide.id, { content: e.target.value })}
              className="flex-1 resize-none text-base"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

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
              <Reorder.Group axis="y" values={slides} onReorder={setSlides} className="space-y-2 p-4 pt-0">
                {slides.map((slide, index) => (
                  <Reorder.Item key={slide.id} value={slide} className="group relative bg-card rounded-md">
                    <div className="flex items-center">
                      <div className="px-2 cursor-grab text-muted-foreground hover:text-foreground">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left h-auto py-3 pr-12",
                          slide.id === activeSlideId && "bg-muted hover:bg-muted"
                        )}
                        onClick={() => setActiveSlideId(slide.id)}
                      >
                        {slide.type === "intro" ? (
                          <User className="h-4 w-4 mr-3 text-primary shrink-0" />
                        ) : (
                          <span className="font-semibold text-primary mr-3">{index}.</span>
                        )}
                        <span className="truncate flex-1">
                          {slide.type === "intro" ? slide.profile.name : slide.title}
                        </span>
                      </Button>
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-muted z-10 rounded-md">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </ScrollArea>
            <div className="p-4 mt-auto border-t">
              <Button className="w-full" onClick={addSlide}>
                <Plus className="mr-2 h-4 w-4" />
                Add Content Slide
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-muted/40">
          {activeSlide ? (
            renderEditView()
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
