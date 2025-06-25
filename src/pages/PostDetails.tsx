
import React from 'react';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';

const PostDetails = () => {
  const mockPost = {
    id: '1',
    user: 'rahul_dev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    content: 'Just finished a coding session at 2 AM. The satisfaction of solving that bug is unmatched! 🚀',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    mood: 'productive',
    aura: 142,
    echosense: 'uplifting',
    timeAgo: '2h',
    reactions: { hearts: 23, boosts: 5, comments: 8 }
  };

  const mockComments = [
    {
      id: '1',
      user: 'priya_artist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      content: 'This is so relatable! Nothing beats that eureka moment 💡',
      timeAgo: '1h',
      aura: 15
    },
    {
      id: '2',
      user: 'tech_guru',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'What bug were you working on? Always curious about other devs\' challenges!',
      timeAgo: '45m',
      aura: 8
    }
  ];

  return (
    <div className="space-y-4 animate-glass-fade-in">
      {/* Post Card */}
      <div className="post-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={mockPost.avatar}
              alt={mockPost.user}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium">{mockPost.user}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{mockPost.timeAgo}</span>
                <span className="mood-badge bg-mood-productive text-white">
                  {mockPost.mood}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-foreground mb-4 leading-relaxed">{mockPost.content}</p>

        {mockPost.image && (
          <img
            src={mockPost.image}
            alt="Post content"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}

        <div className="flex items-center justify-between py-3 border-t border-white/20">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart size={18} />
              <span className="text-sm">{mockPost.reactions.hearts}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{mockPost.reactions.comments}</span>
            </button>
          </div>
          <button className="glass-card-secondary px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-100 transition-colors">
            <ArrowUp size={16} className="text-purple-600" />
            <span className="text-sm font-medium">Boost with {mockPost.aura} Aura</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="font-semibold mb-4">Comments</h3>
        
        {/* Comment Input */}
        <div className="mb-4">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full p-3 glass-card-secondary rounded-xl resize-none border-none outline-none text-sm"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium">
              Comment
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="glass-card-secondary p-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                    <span className="text-xs text-purple-600 font-medium">+{comment.aura} aura</span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
