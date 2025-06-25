
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Globe, Sparkles, Upload, Camera } from 'lucide-react';

interface CommunityCreationModalProps {
  children: React.ReactNode;
}

const CommunityCreationModal = ({ children }: CommunityCreationModalProps) => {
  const [step, setStep] = useState(1);
  const [communityType, setCommunityType] = useState<'location-bound' | 'location-agnostic' | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tagline: '',
    location: '',
    category: '',
    allowAnonymous: false,
    enableAura: true,
    visibility: 'public'
  });

  const categories = [
    'Fitness', 'Coding', 'Chill', 'Events', 'Food', 'Art', 'Music', 'Sports', 'Study', 'Gaming'
  ];

  const handleLocationDetection = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, location: 'Dehradun, Uttarakhand - 248001' }));
      setIsDetectingLocation(false);
    }, 2000);
  };

  const handleCreateCommunity = () => {
    console.log('Creating community:', {
      ...formData,
      type: communityType,
      location: communityType === 'location-bound' ? formData.location : null
    });
    // Reset form
    setStep(1);
    setCommunityType(null);
    setFormData({
      name: '',
      description: '',
      tagline: '',
      location: '',
      category: '',
      allowAnonymous: false,
      enableAura: true,
      visibility: 'public'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-sm mx-auto rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {step === 1 ? 'Create Your Community' : 'Community Details'}
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
                  <h3 className="font-medium text-sm">📍 Location-Bound</h3>
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
                  <h3 className="font-medium text-sm">🌍 Location-Agnostic</h3>
                  <p className="text-xs text-muted-foreground">Connect globally by interests</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 p-2">
            {/* Banner Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Community Banner</label>
              <div className="w-full h-24 glass-card-secondary rounded-xl border-2 border-dashed border-purple-200 flex items-center justify-center hover:bg-white/60 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload size={20} className="mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload Banner</p>
                </div>
              </div>
            </div>

            {/* Icon Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Community Icon</label>
              <div className="w-16 h-16 glass-card-secondary rounded-full border-2 border-dashed border-purple-200 flex items-center justify-center hover:bg-white/60 transition-colors cursor-pointer">
                <Camera size={16} className="text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Community Name</label>
              <Input
                placeholder="e.g., Bidholi Fitness"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="glass-card-secondary border-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Input
                placeholder="What's your community about?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="glass-card-secondary border-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tagline</label>
              <Input
                placeholder="A catchy tagline..."
                value={formData.tagline}
                onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                className="glass-card-secondary border-0"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full glass-card-secondary border-0 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
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
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="glass-card-secondary border-0"
                  />
                </div>
              </div>
            )}

            {/* Settings Toggles */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-medium">Community Settings</h4>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow Anonymous Posting</span>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, allowAnonymous: !prev.allowAnonymous }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    formData.allowAnonymous ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.allowAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Aura Points</span>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, enableAura: !prev.enableAura }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    formData.enableAura ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.enableAura ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Visibility</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  className="w-full glass-card-secondary border-0 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="verified">Verified Only</option>
                </select>
              </div>
            </div>

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
                disabled={!formData.name || !formData.description || (communityType === 'location-bound' && !formData.location)}
                className="flex-1"
              >
                <Sparkles size={16} className="mr-2" />
                Create Community
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommunityCreationModal;
