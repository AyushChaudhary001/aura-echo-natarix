
import React from 'react';
import { Settings, Crown, TrendingUp } from 'lucide-react';
import MoodJourneyChart from '../components/MoodJourneyChart';
import AchievementsBadges from '../components/AchievementsBadges';

const UserProfile = () => {
  const userStats = {
    aura: 2847,
    rank: '#127',
    posts: 23,
    communities: 8,
    followers: 156
  };

  const moodHistory = [
    { date: 'Mon', mood: 'productive', posts: 2, emoji: '🚀' },
    { date: 'Tue', mood: 'chill', posts: 1, emoji: '😎' },
    { date: 'Wed', mood: 'excited', posts: 3, emoji: '⚡' },
    { date: 'Thu', mood: 'zen', posts: 0, emoji: '🧘' },
    { date: 'Fri', mood: 'productive', posts: 1, emoji: '🚀' },
  ];

  const badges = [
    { 
      name: 'Early Adopter', 
      icon: '🌟', 
      description: 'First 1000 users',
      rarity: 'legendary' as const,
      auraEarned: 100
    },
    { 
      name: 'Mood Master', 
      icon: '🎭', 
      description: 'All mood states',
      rarity: 'epic' as const,
      auraEarned: 75
    },
    { 
      name: 'Community Builder', 
      icon: '🏗️', 
      description: 'Created 3+ communities',
      rarity: 'rare' as const,
      auraEarned: 50
    },
    { 
      name: 'Night Owl', 
      icon: '🦉', 
      description: 'Active after midnight',
      rarity: 'common' as const,
      auraEarned: 25
    },
  ];

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Profile Header */}
      <div className="glass-card p-6 rounded-2xl text-center relative">
        <div className="relative inline-block mb-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs">🚀</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-1">rahul_dev</h2>
        <p className="text-sm text-muted-foreground mb-4">📍 Mumbai • Joined 3 months ago</p>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {userStats.aura}
            </div>
            <div className="text-xs text-muted-foreground">Aura</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600">{userStats.rank}</div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{userStats.posts}</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform">
          <Settings size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Mood Journey */}
      <MoodJourneyChart moodHistory={moodHistory} />

      {/* Achievements */}
      <AchievementsBadges badges={badges} />

      {/* Recent Activity */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-3">
          <div className="glass-card-secondary p-3 rounded-xl">
            <p className="text-sm mb-2">Just finished a coding session at 2 AM...</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>2h ago</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">🚀 productive</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">+15 aura</span>
            </div>
          </div>
          <div className="glass-card-secondary p-3 rounded-xl">
            <p className="text-sm mb-2">Mumbai's weather is perfect for coding outdoors...</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>1d ago</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">😎 chill</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">+8 aura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
