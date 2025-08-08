'use client';

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestSlideContent } from '@/ai/flows/suggest-slide-content';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface AiSuggestionsProps {
  topic: string;
  onSuggestionSelect: (suggestion: string) => void;
}

export function AiSuggestions({ topic, onSuggestionSelect }: AiSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestSlideContent({ topic, additionalContext });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('AI suggestion error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate AI suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSuggestions([]);
      setAdditionalContext('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Suggest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Content Suggestions</DialogTitle>
          <DialogDescription>
            Let AI help you brainstorm ideas for your slide content based on {"'"}<b>{topic}</b>{"'"}. You can also provide additional context.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
            <Label htmlFor="additional-context">Additional Context (Optional)</Label>
            <Textarea
              id="additional-context"
              placeholder="e.g., The target audience is beginner developers."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
            />
          </div>

        <div className="py-4">
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Ideas'
            )}
          </Button>
        </div>
        {suggestions.length > 0 && (
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 rounded-md border hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
