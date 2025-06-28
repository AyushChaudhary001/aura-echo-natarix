
import React from 'react';
import { Check, X, UserPlus } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface FriendRequest {
  id: string;
  from: {
    id: string;
    name: string;
    avatar: string;
    aura: number;
  };
  status: 'pending' | 'accepted' | 'declined';
}

interface FriendRequestCardProps {
  request: FriendRequest;
}

const FriendRequestCard = ({ request }: FriendRequestCardProps) => {
  const { acceptFriendRequest, declineFriendRequest } = useAppContext();
  const { toast } = useToast();

  const handleAccept = () => {
    acceptFriendRequest(request.id);
    toast({
      title: "Friend request accepted!",
      description: `You are now friends with ${request.from.name}`,
    });
  };

  const handleDecline = () => {
    declineFriendRequest(request.id);
    toast({
      title: "Friend request declined",
      description: `Request from ${request.from.name} has been declined`,
    });
  };

  return (
    <div className="glass-card p-4 rounded-2xl">
      <div className="flex items-center gap-3">
        <img
          src={request.from.avatar}
          alt={request.from.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm">{request.from.name}</h4>
            <span className="text-xs text-purple-600 font-medium">{request.from.aura} aura</span>
          </div>
          <p className="text-xs text-muted-foreground">wants to be friends</p>
        </div>
        
        {request.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleDecline}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {request.status === 'accepted' && (
          <div className="flex items-center gap-1 text-green-600 text-xs">
            <Check size={12} />
            <span>Friends</span>
          </div>
        )}
        
        {request.status === 'declined' && (
          <div className="flex items-center gap-1 text-red-600 text-xs">
            <X size={12} />
            <span>Declined</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequestCard;
