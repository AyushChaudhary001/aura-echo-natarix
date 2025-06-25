
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingActionButton = () => {
  return (
    <Button
      className="floating-action-btn animate-float"
      size="icon"
      onClick={() => console.log('Create post')}
    >
      <Plus size={24} className="text-primary" />
    </Button>
  );
};

export default FloatingActionButton;
