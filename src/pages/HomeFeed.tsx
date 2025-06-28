
import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import AIAgentCard from '../components/AIAgentCard';
import PostCard from '../components/PostCard';
import CommunityHighlights from '../components/CommunityHighlights';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import NotificationBell from '../components/NotificationBell';

const HomeFeed = () => {
  const { posts, currentUser } = useAppContext();
  const [selectedMood, setSelectedMood] = useState('chill');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Natarix
              </h1>
              <p className="text-sm text-muted-foreground">{getGreeting()}, {currentUser.name}!</p>
            </div>
          </div>
          <NotificationBell />
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          How are you feeling today? Share your vibe with the community ✨
        </p>
      </div>

      {/* Mood Selector */}
      <div className="glass-card rounded-3xl p-4">
        <h3 className="text-lg font-semibold mb-3 text-center">Choose Your Mood</h3>
        <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />
      </div>

      {/* Community Highlights */}
      <CommunityHighlights />

      {/* AI Agent Card */}
      <AIAgentCard currentMood={selectedMood} />

      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Community Feed</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-6">
        <button className="glass-card px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-transform">
          Load more posts
        </button>
      </div>
    </div>
  );
};

export default HomeFeed;
