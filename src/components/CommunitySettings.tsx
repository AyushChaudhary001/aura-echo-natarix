
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, MapPin, Shield, Users, Bell, Eye } from 'lucide-react';

interface CommunitySettingsProps {
  communityName: string;
  children: React.ReactNode;
}

const CommunitySettings = ({ communityName, children }: CommunitySettingsProps) => {
  const [settings, setSettings] = useState({
    auraSystem: true,
    allowDMs: true,
    allowAnonymous: false,
    locationVerification: true,
    autoApproveJoin: true,
    moderatorRequests: false,
    notificationsMentions: true,
    notificationsReports: true
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSaveSettings = () => {
    console.log('Saving community settings:', settings);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-md mx-auto rounded-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold flex items-center justify-center gap-2">
            <Settings size={20} className="text-muted-foreground" />
            {communityName} Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-2">
          {/* Aura System */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-purple-500" />
              <h3 className="font-medium text-sm">Aura System</h3>
            </div>
            
            <div className="glass-card-secondary p-3 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Aura Points</span>
                <button
                  onClick={() => handleToggle('auraSystem')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.auraSystem ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.auraSystem ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow DMs</span>
                <button
                  onClick={() => handleToggle('allowDMs')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.allowDMs ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.allowDMs ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow Anonymous Posts</span>
                <button
                  onClick={() => handleToggle('allowAnonymous')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.allowAnonymous ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.allowAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Location & Verification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              <h3 className="font-medium text-sm">Location & Verification</h3>
            </div>
            
            <div className="glass-card-secondary p-3 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm">Location Re-verification</span>
                  <p className="text-xs text-muted-foreground">Every 60 days</p>
                </div>
                <button
                  onClick={() => handleToggle('locationVerification')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.locationVerification ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.locationVerification ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full glass-card border-0">
                  Force Re-verification Now
                </Button>
              </div>
            </div>
          </div>

          {/* Joining Rules */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              <h3 className="font-medium text-sm">Joining Rules</h3>
            </div>
            
            <div className="glass-card-secondary p-3 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-approve Join Requests</span>
                <button
                  onClick={() => handleToggle('autoApproveJoin')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.autoApproveJoin ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.autoApproveJoin ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Require Moderator Approval</span>
                <button
                  onClick={() => handleToggle('moderatorRequests')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.moderatorRequests ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.moderatorRequests ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-orange-500" />
              <h3 className="font-medium text-sm">Notifications</h3>
            </div>
            
            <div className="glass-card-secondary p-3 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Notify for Mentions</span>
                <button
                  onClick={() => handleToggle('notificationsMentions')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notificationsMentions ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.notificationsMentions ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Notify for Reports</span>
                <button
                  onClick={() => handleToggle('notificationsReports')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notificationsReports ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.notificationsReports ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-red-500" />
              <h3 className="font-medium text-sm text-red-600">Danger Zone</h3>
            </div>
            
            <div className="glass-card-secondary p-3 rounded-xl space-y-2 border border-red-200">
              <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200">
                Transfer Ownership
              </Button>
              <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200">
                Archive Community
              </Button>
              <Button variant="destructive" size="sm" className="w-full">
                Delete Community
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button onClick={handleSaveSettings} className="w-full">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunitySettings;
