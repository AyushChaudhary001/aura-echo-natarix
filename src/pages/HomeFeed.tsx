
import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import AIAgentCard from '../components/AIAgentCard';
import PostCard from '../components/PostCard';
import { Bell } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const HomeFeed = () => {
  const { posts } = useAppContext();
  const [selectedMood, setSelectedMood] = useState('chill');

  return (
    <div className="space-y-4 animate-glass-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Natarix
          </h1>
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
        </div>
        <button className="p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform">
          <Bell size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Mood Selector */}
      <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />

      {/* AI Agent Card */}
      <AIAgentCard currentMood={selectedMood} />

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
