
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Users, Lock } from 'lucide-react';

interface SubCommunityCreationModalProps {
  parentCommunity: string;
  children: React.ReactNode;
}

const SubCommunityCreationModal = ({ parentCommunity, children }: SubCommunityCreationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    emoji: '🎯',
    visibility: 'open'
  });

  const emojis = ['🎯', '💪', '🧘', '💃', '🎨', '📚', '🎵', '🍕', '🚀', '⚡'];

  const handleCreateSubCommunity = () => {
    console.log('Creating sub-community:', {
      ...formData,
      parentCommunity
    });
    
    // Reset form
    setFormData({
      name: '',
      purpose: '',
      emoji: '🎯',
      visibility: 'open'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-sm mx-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Create Sub-club
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Under {parentCommunity}
          </p>
        </DialogHeader>

        <div className="space-y-4 p-2">
          {/* Emoji Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Choose Emoji</label>
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                  className={`w-12 h-12 rounded-xl text-xl transition-all ${
                    formData.emoji === emoji
                      ? 'bg-primary text-white scale-110'
                      : 'glass-card-secondary hover:bg-white/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sub-club Name</label>
            <Input
              placeholder="e.g., Gold's Gym"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="glass-card-secondary border-0"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Purpose</label>
            <Input
              placeholder="What's this sub-club about?"
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              className="glass-card-secondary border-0"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Visibility</label>
            <div className="space-y-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, visibility: 'open' }))}
                className={`w-full glass-card-secondary p-3 rounded-xl text-left transition-all ${
                  formData.visibility === 'open' ? 'border-2 border-primary' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Open</div>
                    <div className="text-xs text-muted-foreground">Anyone can join</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setFormData(prev => ({ ...prev, visibility: 'invite' }))}
                className={`w-full glass-card-secondary p-3 rounded-xl text-left transition-all ${
                  formData.visibility === 'invite' ? 'border-2 border-primary' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-orange-500" />
                  <div>
                    <div className="text-sm font-medium">Invite-only</div>
                    <div className="text-xs text-muted-foreground">Members need invitation</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleCreateSubCommunity}
              disabled={!formData.name || !formData.purpose}
              className="flex-1"
            >
              <Sparkles size={16} className="mr-2" />
              Create Sub-club
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubCommunityCreationModal;
