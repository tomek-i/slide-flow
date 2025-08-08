'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Slide } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { SlideComponent } from '@/components/slide';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PresentationProps {
  slides: Slide[];
}

export function Presentation({ slides }: PresentationProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideControls = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    hideControls();
  };
  
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    hideControls();
    
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
  }, [api]);

  const toggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen bg-background"
      onMouseMove={handleMouseMove}
    >
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent>
          {slides.map(slide => (
            <CarouselItem key={slide.id} className="h-full w-full">
              <SlideComponent slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className={cn("absolute inset-x-0 bottom-10 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <div className="flex items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">
                    Slide {current} of {count}
                </p>
            </div>
        </div>
        <CarouselPrevious className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")} />
        <CarouselNext className={cn("absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")} />
      </Carousel>

      <div className={cn("absolute top-4 right-4 flex items-center gap-2 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <Button variant="outline" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          <span className="sr-only">{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
        </Button>
        <Link href="/" passHref>
          <Button variant="outline" size="icon" aria-label="Close presentation">
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
