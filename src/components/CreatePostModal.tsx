
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, MapPin } from 'lucide-react';

interface CreatePostModalProps {
  children: React.ReactNode;
  currentMood?: string;
}

const CreatePostModal = ({ children, currentMood = 'chill' }: CreatePostModalProps) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(currentMood);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const moods = ['chill', 'productive', 'cranky', 'lost', 'excited', 'zen'];

  const handleSubmit = () => {
    console.log('Creating post:', { content, mood: selectedMood, image, location });
    setContent('');
    setImage(null);
    setLocation('');
    setIsOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Mood Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your vibe right now</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`mood-badge capitalize transition-all ${
                    selectedMood === mood
                      ? `bg-mood-${mood} text-white`
                      : 'bg-white/50 text-muted-foreground hover:bg-white/70'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] glass-card-secondary border-0 resize-none"
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="relative">
              <img src={image} alt="Upload preview" className="w-full h-32 object-cover rounded-xl" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Add location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="p-2 glass-card-secondary rounded-full hover:bg-white/70 transition-colors">
                  <ImageIcon size={18} className="text-muted-foreground" />
                </div>
              </label>
            </div>
            
            <Button 
              onClick={handleSubmit} 
              disabled={!content.trim()}
              className="px-6"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
