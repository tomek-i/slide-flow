import { Card, CardContent } from '@/components/ui/card';
import type { ContentSlide } from '@/lib/types';
import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SlideComponentProps {
  slide: ContentSlide;
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
                ul: ({...props}) => <ul className="list-disc list-outside text-left pl-6 [&_ul]:list-[circle] [&_ul]:ml-4" {...props} />,
                ol: ({...props}) => <ol className="list-decimal list-outside text-left pl-6" {...props} />,
                li: ({...props}) => <li className="mb-2" {...props} />,
                code: ({...props}) => <code className="bg-muted text-primary font-mono rounded-sm px-1 py-0.5" {...props} />,

              }}
            >
              {slide.content}
            </ReactMarkdown>
            {slide.socials && <>
              <div className="flex flex-col gap-3 text-sm mt-6">
                <a
                  href={`mailto:${slide.socials.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="font-mono">{slide.socials.email}</span>
                </a>
                <a
                  href={slide.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="font-mono">{slide.socials.github}</span>
                </a>
                <a
                  href={slide.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="font-mono">{slide.socials.linkedin}</span>
                </a>
                <a
                  href={slide.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-mono">{slide.socials.website}</span>
                </a>
              </div>
            </>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
