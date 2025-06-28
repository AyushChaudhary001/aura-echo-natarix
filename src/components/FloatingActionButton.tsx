
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePostModal from './CreatePostModal';

const FloatingActionButton = () => {
  return (
    <CreatePostModal>
      <Button
        className="floating-action-btn animate-float"
        size="icon"
      >
        <Plus size={24} className="text-primary-foreground" />
      </Button>
    </CreatePostModal>
  );
};

export default FloatingActionButton;
