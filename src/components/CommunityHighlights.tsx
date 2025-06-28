
import React from 'react';
import { TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Highlight {
  id: string;
  type: 'trending' | 'community' | 'achievement';
  title: string;
  description: string;
  image?: string;
  stats?: string;
  gradient: string;
}

const CommunityHighlights = () => {
  const navigate = useNavigate();

  const highlights: Highlight[] = [
    {
      id: '1',
      type: 'trending',
      title: 'Coding Motivation',
      description: 'Latest post by rahul_dev is trending',
      stats: '23 hearts',
      gradient: 'from-purple-400 to-blue-500',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      type: 'community',
      title: 'Mumbai Foodies',
      description: 'New recipes shared today',
      stats: '12 new posts',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Aura Milestone',
      description: 'You\'re close to 500 aura!',
      stats: '420/500',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: '4',
      type: 'trending',
      title: 'Deep Thoughts',
      description: 'Philosophical discussion trending',
      stats: '67 hearts',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp size={16} className="text-white" />;
      case 'community': return <Users size={16} className="text-white" />;
      case 'achievement': return <Sparkles size={16} className="text-white" />;
      default: return <TrendingUp size={16} className="text-white" />;
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Community Highlights</h3>
        <button 
          onClick={() => navigate('/explore')}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Explore <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${highlight.gradient} text-white cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
            onClick={() => {
              if (highlight.type === 'community') navigate('/explore');
              else if (highlight.type === 'trending') navigate('/');
            }}
          >
            {highlight.image && (
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                <img src={highlight.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              {getIcon(highlight.type)}
              <span className="text-xs font-medium opacity-90">
                {highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
              </span>
            </div>
            
            <h4 className="font-medium text-sm mb-1 line-clamp-1">
              {highlight.title}
            </h4>
            <p className="text-xs opacity-80 mb-2 line-clamp-2">
              {highlight.description}
            </p>
            
            {highlight.stats && (
              <div className="text-xs font-medium bg-white/20 rounded-full px-2 py-1 inline-block">
                {highlight.stats}
              </div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHighlights;
