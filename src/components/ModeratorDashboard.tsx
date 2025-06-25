
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Shield, MapPin, RotateCcw } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  avatar: string;
  aura: number;
  joinedDate: string;
  isVerified: boolean;
  isMod: boolean;
}

interface ModeratorDashboardProps {
  communityName: string;
  members: Member[];
  children: React.ReactNode;
}

const ModeratorDashboard = ({ communityName, members, children }: ModeratorDashboardProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleTransferRights = (memberId: string) => {
    console.log('Transfer moderator rights to:', memberId);
  };

  const handleSetTempMod = (memberId: string) => {
    console.log('Set temporary moderator:', memberId);
  };

  const handleReverifyLocation = () => {
    console.log('Requesting location reverification');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-md mx-auto rounded-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold flex items-center justify-center gap-2">
            <Crown size={20} className="text-yellow-500" />
            {communityName} Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-2">
          {/* Community Stats */}
          <div className="glass-card-secondary p-3 rounded-2xl">
            <h3 className="font-medium text-sm mb-2">Community Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{members.length}</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {members.reduce((sum, member) => sum + member.aura, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Aura</div>
              </div>
            </div>
          </div>

          {/* Location Verification */}
          <div className="glass-card-secondary p-3 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">Location Verification</h3>
              <Button
                onClick={handleReverifyLocation}
                size="sm"
                variant="outline"
                className="h-8 px-3 glass-card border-0"
              >
                <RotateCcw size={14} className="mr-1" />
                Reverify
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Last verified 45 days ago • Next required in 15 days
            </p>
          </div>

          {/* Member List */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Users size={16} />
              Members ({members.length})
            </h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="glass-card-secondary p-3 rounded-xl hover:bg-white/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{member.name}</span>
                          {member.isMod && (
                            <Badge variant="secondary" className="text-xs h-5">
                              <Shield size={10} className="mr-1" />
                              Mod
                            </Badge>
                          )}
                          {member.isVerified && (
                            <Badge variant="secondary" className="text-xs h-5 bg-green-100 text-green-700">
                              <MapPin size={10} className="mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.aura} aura • Joined {member.joinedDate}
                        </div>
                      </div>
                    </div>
                    
                    {!member.isMod && member.isVerified && (
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleSetTempMod(member.id)}
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs glass-card border-0"
                        >
                          Temp Mod
                        </Button>
                        <Button
                          onClick={() => handleTransferRights(member.id)}
                          size="sm"
                          className="h-7 px-2 text-xs"
                        >
                          Transfer
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorDashboard;
