import type { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

interface SlideComponentProps {
  slide: Slide;
}

export function SlideComponent({ slide }: SlideComponentProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 sm:p-12 md:p-16">
      <Card className="max-w-4xl w-full aspect-[16/9] flex flex-col justify-center shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold text-primary mb-8">{slide.title}</h1>
          <div className="text-2xl text-foreground/80 leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({...props}) => <p className="mb-4 last:mb-0" {...props} />,
                strong: ({...props}) => <strong className="font-bold" {...props} />,
                em: ({...props}) => <em className="italic" {...props} />,
                ul: ({...props}) => <ul className="list-disc list-outside text-left pl-6" {...props} />,
                ol: ({...props}) => <ol className="list-decimal list-outside text-left pl-6" {...props} />,
                li: ({...props}) => <li className="mb-2" {...props} />,
                code: ({...props}) => <code className="bg-muted text-primary font-mono rounded-sm px-1 py-0.5" {...props} />,

              }}
            >
              {slide.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
