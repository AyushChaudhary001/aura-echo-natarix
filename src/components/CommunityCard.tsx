
import React from 'react';
import { MapPin, Users, Settings } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  members: string;
  mood: string;
  location: string | null;
  image: string;
  isLocal: boolean;
  hasSubCommunities?: boolean;
}

interface CommunityCardProps {
  community: Community;
  isModerator?: boolean;
}

const CommunityCard = ({ community, isModerator = false }: CommunityCardProps) => {
  const moodColors = {
    cranky: 'bg-mood-cranky',
    chill: 'bg-mood-chill',
    productive: 'bg-mood-productive',
    lost: 'bg-mood-lost',
    excited: 'bg-mood-excited',
    zen: 'bg-mood-zen',
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-32 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3">
          <div className="flex items-center justify-between">
            <span className={`mood-badge ${moodColors[community.mood as keyof typeof moodColors]} text-white text-xs`}>
              {community.mood}
            </span>
            {community.isLocal && community.location && (
              <div className="flex items-center gap-1 text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <span>📍</span>
                <span>{community.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {isModerator && (
          <button className="absolute top-2 right-2 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
            <Settings size={16} className="text-white" />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm">{community.name}</h3>
          {community.hasSubCommunities && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              Sub-clubs
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{community.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users size={14} />
            <span className="text-xs">{community.members} members</span>
          </div>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-primary/90 transition-colors">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
