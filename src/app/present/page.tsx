"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Presentation } from "@/components/presentation";
import type { Slide, ContentSlide, IntroSlide } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { initialSlides } from "@/data/slides";

export default function PresentPage() {
  const [slides] = useLocalStorage<Slide[]>("slides", initialSlides);
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
    );
  }

  return <Presentation slides={slides} />;
}
