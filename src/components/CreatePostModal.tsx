
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Image, Smile, MapPin } from 'lucide-react';

interface CreatePostModalProps {
  children: React.ReactNode;
}

const CreatePostModal = ({ children }: CreatePostModalProps) => {
  const [currentMood, setCurrentMood] = useState('chill');
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const moods = [
    { id: 'cranky', label: 'Cranky', emoji: '😤', color: 'bg-red-100 text-red-700' },
    { id: 'chill', label: 'Chill', emoji: '😎', color: 'bg-blue-100 text-blue-700' },
    { id: 'productive', label: 'Productive', emoji: '🚀', color: 'bg-green-100 text-green-700' },
    { id: 'lost', label: 'Lost', emoji: '🌊', color: 'bg-purple-100 text-purple-700' },
    { id: 'excited', label: 'Excited', emoji: '⚡', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'zen', label: 'Zen', emoji: '🧘', color: 'bg-indigo-100 text-indigo-700' },
  ];

  const handleCreatePost = () => {
    console.log('Creating post:', {
      title: postTitle,
      content: postContent,
      mood: currentMood
    });
    
    // Reset form
    setPostTitle('');
    setPostContent('');
    setCurrentMood('chill');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-sm mx-auto rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Share Your Vibe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-2">
          {/* Mood Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setCurrentMood(mood.id)}
                  className={`p-3 rounded-xl transition-all text-center ${
                    currentMood === mood.id
                      ? `${mood.color} scale-105 shadow-lg`
                      : 'glass-card-secondary hover:bg-white/60'
                  }`}
                >
                  <div className="text-lg mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Title (Optional)</label>
            <Input
              placeholder="What's on your mind?"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="glass-card-secondary border-0"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Share your thoughts...</label>
            <Textarea
              placeholder="Express yourself freely..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="glass-card-secondary border-0 min-h-24 resize-none"
            />
          </div>

          {/* Media Options */}
          <div className="flex gap-2">
            <button className="flex-1 glass-card-secondary p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/60 transition-colors">
              <Camera size={16} className="text-muted-foreground" />
              <span className="text-xs">Camera</span>
            </button>
            <button className="flex-1 glass-card-secondary p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/60 transition-colors">
              <Image size={16} className="text-muted-foreground" />
              <span className="text-xs">Gallery</span>
            </button>
            <button className="flex-1 glass-card-secondary p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/60 transition-colors">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-xs">Location</span>
            </button>
          </div>

          {/* Post Settings */}
          <div className="glass-card-secondary p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Anonymous Post</span>
              <button className="w-10 h-5 bg-gray-300 rounded-full transition-colors">
                <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-0.5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Add to Story</span>
              <button className="w-10 h-5 bg-gray-300 rounded-full transition-colors">
                <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-0.5" />
              </button>
            </div>
          </div>

          <Button
            onClick={handleCreatePost}
            disabled={!postContent}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Smile size={16} className="mr-2" />
            Share Your Vibe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
