import type { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface SlideComponentProps {
  slide: Slide;
}

export function SlideComponent({ slide }: SlideComponentProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 sm:p-12 md:p-16">
      <Card className="max-w-4xl w-full aspect-[16/9] flex flex-col justify-center shadow-2xl">
        <CardContent className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold text-primary mb-8">{slide.title}</h1>
          <div className="text-2xl text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {slide.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
