
import React from 'react';
import { MapPin, Users, Settings, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  userRole?: 'creator' | 'moderator' | 'member' | 'guest';
  auraLevel?: number;
}

interface CommunityCardProps {
  community: Community;
  isModerator?: boolean;
}

const CommunityCard = ({ community, isModerator = false }: CommunityCardProps) => {
  const navigate = useNavigate();
  
  const moodColors = {
    cranky: 'bg-red-100 text-red-700',
    chill: 'bg-blue-100 text-blue-700',
    productive: 'bg-green-100 text-green-700',
    lost: 'bg-purple-100 text-purple-700',
    excited: 'bg-yellow-100 text-yellow-700',
    zen: 'bg-indigo-100 text-indigo-700',
  };

  const handleCardClick = () => {
    navigate(`/community/${community.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-2 left-3 right-3">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${moodColors[community.mood as keyof typeof moodColors]}`}>
              {community.mood}
            </span>
            {community.isLocal && community.location && (
              <div className="flex items-center gap-1 text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <MapPin size={12} />
                <span>{community.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {(isModerator || community.userRole === 'creator') && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Settings clicked');
            }}
            className="absolute top-2 right-2 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
          >
            <Settings size={16} className="text-white" />
          </button>
        )}

        {community.userRole === 'creator' && (
          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
            <Crown size={12} />
            <span className="text-xs font-medium">Creator</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm">{community.name}</h3>
          <div className="flex gap-1">
            {community.hasSubCommunities && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                Sub-clubs
              </span>
            )}
            {community.auraLevel && (
              <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-2 py-1 rounded-full">
                ✨ {community.auraLevel}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{community.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users size={14} />
            <span className="text-xs">{community.members} members</span>
          </div>
          
          {community.userRole === 'guest' ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                console.log('Join community:', community.id);
              }}
              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs font-medium hover:from-purple-600 hover:to-blue-600 transition-colors"
            >
              Join
            </button>
          ) : (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              ✓ Joined
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
