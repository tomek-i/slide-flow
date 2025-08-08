import type { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface SlideComponentProps {
  slide: Slide;
}

export function SlideComponent({ slide }: SlideComponentProps) {
  return (
    <Card className="h-full w-full border-0 shadow-none rounded-none">
      <CardContent className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-bold text-primary mb-8">{slide.title}</h1>
        <div className="text-2xl text-foreground/80 leading-relaxed whitespace-pre-wrap">
          {slide.content}
        </div>
      </CardContent>
    </Card>
  );
}
