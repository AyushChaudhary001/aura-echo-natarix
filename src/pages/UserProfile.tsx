
import React, { useState } from 'react';
import { Settings, Crown, TrendingUp, Palette, User, Sparkles, Star, Heart } from 'lucide-react';
import MoodJourneyChart from '../components/MoodJourneyChart';
import AchievementsBadges from '../components/AchievementsBadges';

const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState({
    style: 'gradient',
    color: 'purple-blue',
    icon: 'A'
  });

  const avatarStyles = [
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 'solid', name: 'Solid', preview: 'bg-purple-500' },
    { id: 'pattern', name: 'Pattern', preview: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' }
  ];

  const avatarColors = [
    { id: 'purple-blue', name: 'Purple Blue', class: 'from-purple-500 to-blue-500' },
    { id: 'pink-orange', name: 'Pink Orange', class: 'from-pink-500 to-orange-500' },
    { id: 'green-teal', name: 'Green Teal', class: 'from-green-500 to-teal-500' },
    { id: 'red-pink', name: 'Red Pink', class: 'from-red-500 to-pink-500' }
  ];

  const avatarIcons = [
    { id: 'A', icon: 'A', name: 'Letter' },
    { id: 'user', icon: User, name: 'User' },
    { id: 'sparkles', icon: Sparkles, name: 'Sparkles' },
    { id: 'star', icon: Star, name: 'Star' },
    { id: 'heart', icon: Heart, name: 'Heart' }
  ];

  const userStats = {
    aura: 2847,
    rank: '#127',
    posts: 23,
    communities: 8,
    followers: 156
  };

  const moodHistory = [
    { date: 'Today', mood: 'productive', posts: 2 },
    { date: 'Yesterday', mood: 'chill', posts: 1 },
    { date: '2 days ago', mood: 'excited', posts: 3 },
    { date: '3 days ago', mood: 'zen', posts: 0 },
    { date: '4 days ago', mood: 'productive', posts: 1 },
  ];

  const badges = [
    { name: 'Early Adopter', icon: '🌟', description: 'One of the first 1000 users', earned: true },
    { name: 'Mood Master', icon: '🎭', description: 'Experienced all mood states', earned: true },
    { name: 'Community Builder', icon: '🏗️', description: 'Created 3+ communities', earned: false },
    { name: 'Aura Legend', icon: '💫', description: 'Reached 5000+ aura points', earned: false },
  ];

  const getAvatarClass = () => {
    const color = avatarColors.find(c => c.id === selectedAvatar.color);
    if (selectedAvatar.style === 'gradient') {
      return `bg-gradient-to-br ${color?.class}`;
    } else if (selectedAvatar.style === 'pattern') {
      return `bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500`;
    }
    return 'bg-purple-500';
  };

  const renderAvatarIcon = () => {
    const iconData = avatarIcons.find(i => i.id === selectedAvatar.icon);
    if (iconData?.id === 'A') {
      return <span className="text-2xl text-white font-bold">A</span>;
    }
    const IconComponent = iconData?.icon as any;
    return <IconComponent size={24} className="text-white" />;
  };

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Profile Header */}
      <div className="glass-card p-6 rounded-2xl text-center relative">
        <div className="relative inline-block mb-4">
          <div className={`w-20 h-20 rounded-full ${getAvatarClass()} flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110`}>
            {renderAvatarIcon()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-mood-productive rounded-full border-2 border-white animate-pulse"></div>
        </div>
        
        <h2 className="text-xl font-bold mb-1">anonymous_user</h2>
        <p className="text-sm text-muted-foreground mb-4">Location Hidden • Joined 3 months ago</p>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{userStats.aura}</div>
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

      {/* Avatar Customization */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Palette size={18} className="text-purple-500" />
          Customize Avatar
        </h3>
        
        <div className="space-y-4">
          {/* Avatar Preview */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full ${getAvatarClass()} flex items-center justify-center mx-auto mb-2 transition-all duration-300`}>
              {renderAvatarIcon()}
            </div>
            <p className="text-xs text-muted-foreground">Preview</p>
          </div>
          
          {/* Style Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Style</p>
            <div className="flex gap-2">
              {avatarStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedAvatar({...selectedAvatar, style: style.id})}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    selectedAvatar.style === style.id 
                      ? 'glass-card-secondary scale-105' 
                      : 'glass-card hover:glass-card-secondary'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2">
              {avatarColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedAvatar({...selectedAvatar, color: color.id})}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${color.class} border-2 transition-all duration-200 ${
                    selectedAvatar.color === color.id 
                      ? 'border-white scale-110 shadow-lg' 
                      : 'border-transparent hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Icon Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Icon</p>
            <div className="flex gap-2 flex-wrap">
              {avatarIcons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setSelectedAvatar({...selectedAvatar, icon: icon.id})}
                  className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all duration-200 ${
                    selectedAvatar.icon === icon.id 
                      ? 'glass-card-secondary scale-105' 
                      : 'hover:glass-card-secondary hover:scale-105'
                  }`}
                >
                  {icon.id === 'A' ? (
                    <span className="text-sm font-bold">A</span>
                  ) : (
                    React.createElement(icon.icon, { size: 16 })
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
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
              <span className="mood-badge bg-mood-productive text-white">productive</span>
            </div>
          </div>
          <div className="glass-card-secondary p-3 rounded-xl">
            <p className="text-sm mb-2">Weather is perfect for coding outdoors...</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>1d ago</span>
              <span className="mood-badge bg-mood-chill text-white">chill</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
