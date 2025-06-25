
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePostModal from './CreatePostModal';

const FloatingActionButton = () => {
  return (
    <CreatePostModal>
      <Button
        className="floating-action-btn animate-float bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
        size="icon"
      >
        <Plus size={24} className="text-white" />
      </Button>
    </CreatePostModal>
  );
};

export default FloatingActionButton;
