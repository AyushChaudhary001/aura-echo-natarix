
import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import AIAgentCard from '../components/AIAgentCard';
import PostCard from '../components/PostCard';
import { Bell } from 'lucide-react';

const HomeFeed = () => {
  const [selectedMood, setSelectedMood] = useState('chill');

  const mockPosts = [
    {
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
    },
    {
      id: '2',
      user: 'priya_artist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      content: 'Sometimes I feel like I\'m floating in this vast universe, trying to find my purpose. Anyone else feel this way?',
      mood: 'lost',
      aura: 89,
      echosense: 'contemplative',
      timeAgo: '4h',
      reactions: { hearts: 67, boosts: 12, comments: 24 }
    },
    {
      id: '3',
      user: 'mumbai_foodie',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'Discovered this hidden gem in Bandra! The vada pav here hits different when you\'re homesick 🏠❤️',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      mood: 'chill',
      aura: 203,
      echosense: 'nostalgic',
      timeAgo: '6h',
      reactions: { hearts: 156, boosts: 28, comments: 45 }
    }
  ];

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
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
