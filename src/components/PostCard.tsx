
import React from 'react';
import { Heart, MessageCircle, ArrowUp } from 'lucide-react';

interface Post {
  id: string;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  mood: string;
  aura: number;
  echosense: string;
  timeAgo: string;
  reactions: {
    hearts: number;
    boosts: number;
    comments: number;
  };
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const moodColors = {
    cranky: 'bg-mood-cranky',
    chill: 'bg-mood-chill',
    productive: 'bg-mood-productive',
    lost: 'bg-mood-lost',
    excited: 'bg-mood-excited',
    zen: 'bg-mood-zen',
  };

  const echosenseColors = {
    uplifting: 'text-green-600',
    contemplative: 'text-blue-600',
    nostalgic: 'text-amber-600',
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.user}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-sm">{post.user}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.timeAgo}</span>
              <span className={`mood-badge ${moodColors[post.mood as keyof typeof moodColors]} text-white`}>
                {post.mood}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-purple-600">{post.aura} aura</div>
          <div className={`text-xs ${echosenseColors[post.echosense as keyof typeof echosenseColors]}`}>
            {post.echosense}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/20">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
            <Heart size={16} />
            <span className="text-xs">{post.reactions.hearts}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 transition-colors">
            <MessageCircle size={16} />
            <span className="text-xs">{post.reactions.comments}</span>
          </button>
        </div>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-purple-500 transition-colors">
          <ArrowUp size={16} />
          <span className="text-xs">Boost ({post.reactions.boosts})</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
