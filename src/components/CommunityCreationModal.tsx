
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Globe, Sparkles } from 'lucide-react';

interface CommunityCreationModalProps {
  children: React.ReactNode;
}

const CommunityCreationModal = ({ children }: CommunityCreationModalProps) => {
  const [step, setStep] = useState(1);
  const [communityType, setCommunityType] = useState<'location-bound' | 'location-agnostic' | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');

  const handleLocationDetection = () => {
    setIsDetectingLocation(true);
    // Simulate location detection
    setTimeout(() => {
      setLocation('Mumbai, Maharashtra - 400001');
      setIsDetectingLocation(false);
    }, 2000);
  };

  const handleCreateCommunity = () => {
    console.log('Creating community:', {
      name: communityName,
      description,
      type: communityType,
      location: communityType === 'location-bound' ? location : null
    });
    // Reset form
    setStep(1);
    setCommunityType(null);
    setLocation('');
    setCommunityName('');
    setDescription('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-sm mx-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {step === 1 ? 'Create Community' : 'Community Details'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 p-2">
            <p className="text-sm text-muted-foreground text-center mb-6">
              Choose how your community will connect
            </p>
            
            <button
              onClick={() => {
                setCommunityType('location-bound');
                setStep(2);
              }}
              className="w-full glass-card-secondary p-4 rounded-2xl hover:bg-white/60 transition-all duration-300 border-2 border-transparent hover:border-purple-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-sm">Location-Bound</h3>
                  <p className="text-xs text-muted-foreground">Connect with people nearby</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setCommunityType('location-agnostic');
                setStep(2);
              }}
              className="w-full glass-card-secondary p-4 rounded-2xl hover:bg-white/60 transition-all duration-300 border-2 border-transparent hover:border-purple-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Globe size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-sm">Location-Agnostic</h3>
                  <p className="text-xs text-muted-foreground">Connect globally by interests</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 p-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Community Name</label>
              <Input
                placeholder="Enter community name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="glass-card-secondary border-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Input
                placeholder="What's your community about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="glass-card-secondary border-0"
              />
            </div>

            {communityType === 'location-bound' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="space-y-2">
                  <Button
                    onClick={handleLocationDetection}
                    disabled={isDetectingLocation}
                    className="w-full glass-card-secondary text-foreground hover:bg-white/60"
                    variant="secondary"
                  >
                    {isDetectingLocation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                        Detecting Location...
                      </>
                    ) : (
                      <>
                        <MapPin size={16} className="mr-2" />
                        Auto-detect Current Location
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground">or</div>
                  
                  <Input
                    placeholder="Enter pincode or area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="glass-card-secondary border-0"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 glass-card-secondary border-0"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateCommunity}
                disabled={!communityName || !description || (communityType === 'location-bound' && !location)}
                className="flex-1"
              >
                <Sparkles size={16} className="mr-2" />
                Create
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommunityCreationModal;
