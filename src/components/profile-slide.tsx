
'use client';

import type { Profile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Globe, MapPin, Sparkles } from 'lucide-react';

interface ProfileSlideProps {
  profile: Profile;
}

export function ProfileSlide({ profile }: ProfileSlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 sm:p-12 md:p-16">
      <Card className="max-w-4xl w-full aspect-[16/9] flex flex-col justify-center shadow-2xl p-12">
        <CardContent className="flex gap-12 items-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32 border-4 border-primary">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${profile.name}`} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex gap-4">
               <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Github className="h-6 w-6" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-primary">{profile.name}</h1>
            <p className="text-2xl font-semibold text-foreground/80 mt-1">{profile.title} at {profile.company}</p>
            <p className="text-lg text-muted-foreground mt-4 italic">"{profile.bio}"</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary/90 mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {profile.techStack.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent"/>
                    <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent"/>
                    <span className="italic">"{profile.funFact}"</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
