
import React, { useState } from 'react';
import { Settings, Crown, TrendingUp, Palette, User, Sparkles, Star, Heart, Save, Camera, Edit2 } from 'lucide-react';
import MoodJourneyChart from '../components/MoodJourneyChart';
import AchievementsBadges from '../components/AchievementsBadges';
import { useAppContext } from '../contexts/AppContext';

const UserProfile = () => {
  const { currentUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    style: 'gradient',
    color: 'purple-blue',
    icon: 'A'
  });

  const [userProfile, setUserProfile] = useState({
    username: 'anonymous_user',
    bio: 'Just exploring the digital world...',
    location: 'Location Hidden',
    joinedDate: '3 months ago',
    isLocationVisible: false,
    mood: 'productive'
  });

  const [userStats, setUserStats] = useState({
    aura: 2847,
    rank: '#127',
    posts: 23,
    communities: 8,
    followers: 156,
    following: 89
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
    { id: 'red-pink', name: 'Red Pink', class: 'from-red-500 to-pink-500' },
    { id: 'blue-purple', name: 'Blue Purple', class: 'from-blue-500 to-purple-500' },
    { id: 'yellow-red', name: 'Yellow Red', class: 'from-yellow-500 to-red-500' }
  ];

  const avatarIcons = [
    { id: 'A', icon: 'A', name: 'Letter' },
    { id: 'user', icon: User, name: 'User' },
    { id: 'sparkles', icon: Sparkles, name: 'Sparkles' },
    { id: 'star', icon: Star, name: 'Star' },
    { id: 'heart', icon: Heart, name: 'Heart' }
  ];

  const moods = [
    { id: 'productive', name: 'Productive', emoji: '💪', color: 'bg-green-500' },
    { id: 'chill', name: 'Chill', emoji: '😌', color: 'bg-blue-500' },
    { id: 'excited', name: 'Excited', emoji: '🤩', color: 'bg-yellow-500' },
    { id: 'zen', name: 'Zen', emoji: '🧘', color: 'bg-purple-500' },
    { id: 'cranky', name: 'Cranky', emoji: '😤', color: 'bg-red-500' },
    { id: 'lost', name: 'Lost', emoji: '😕', color: 'bg-gray-500' }
  ];

  const moodHistory = [
    { date: 'Today', mood: userProfile.mood, posts: 2 },
    { date: 'Yesterday', mood: 'chill', posts: 1 },
    { date: '2 days ago', mood: 'excited', posts: 3 },
    { date: '3 days ago', mood: 'zen', posts: 0 },
    { date: '4 days ago', mood: 'productive', posts: 1 },
    { date: '5 days ago', mood: 'chill', posts: 2 },
    { date: '6 days ago', mood: 'excited', posts: 1 }
  ];

  const badges = [
    { name: 'Early Adopter', icon: '🌟', description: 'One of the first 1000 users', earned: true },
    { name: 'Mood Master', icon: '🎭', description: 'Experienced all mood states', earned: true },
    { name: 'Community Builder', icon: '🏗️', description: 'Created 3+ communities', earned: false },
    { name: 'Aura Legend', icon: '💫', description: 'Reached 5000+ aura points', earned: false },
    { name: 'Social Butterfly', icon: '🦋', description: 'Made 50+ connections', earned: true },
    { name: 'Content Creator', icon: '✨', description: 'Posted 100+ times', earned: false }
  ];

  const recentPosts = [
    {
      id: 1,
      content: "Just finished a coding session at 2 AM...",
      mood: 'productive',
      timeAgo: '2h ago',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      content: "Weather is perfect for coding outdoors...",
      mood: 'chill',
      timeAgo: '1d ago',
      likes: 8,
      comments: 1
    },
    {
      id: 3,
      content: "Finally solved that bug that was haunting me!",
      mood: 'excited',
      timeAgo: '2d ago',
      likes: 15,
      comments: 5
    }
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

  const handleSaveProfile = () => {
    console.log('Profile saved:', { userProfile, selectedAvatar });
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handleMoodChange = (newMood: string) => {
    setUserProfile(prev => ({ ...prev, mood: newMood }));
    console.log('Mood changed to:', newMood);
  };

  const handleStatClick = (statType: string) => {
    console.log(`Clicked on ${statType} stat`);
    // You could navigate to detailed views here
  };

  const handlePostLike = (postId: number) => {
    console.log(`Liked post ${postId}`);
    // Update post likes
  };

  const getCurrentMoodEmoji = () => {
    const currentMood = moods.find(m => m.id === userProfile.mood);
    return currentMood?.emoji || '😐';
  };

  const getCurrentMoodColor = () => {
    const currentMood = moods.find(m => m.id === userProfile.mood);
    return currentMood?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Profile Header */}
      <div className="glass-card p-6 rounded-2xl text-center relative">
        <div className="relative inline-block mb-4">
          <div className={`w-20 h-20 rounded-full ${getAvatarClass()} flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 cursor-pointer`}>
            {renderAvatarIcon()}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getCurrentMoodColor()} rounded-full border-2 border-white animate-pulse flex items-center justify-center text-xs`}>
            {getCurrentMoodEmoji()}
          </div>
          <button className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:scale-110 transition-transform">
            <Camera size={12} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-1">
          {isEditing ? (
            <input
              type="text"
              value={userProfile.username}
              onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
              className="text-xl font-bold bg-transparent text-center border-b border-gray-300 focus:outline-none focus:border-purple-500"
            />
          ) : (
            <h2 className="text-xl font-bold">{userProfile.username}</h2>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Edit2 size={14} className="text-gray-500" />
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-2 mb-4">
            <textarea
              value={userProfile.bio}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full text-sm bg-transparent text-center border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-purple-500 resize-none"
              rows={2}
              placeholder="Tell us about yourself..."
            />
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={userProfile.isLocationVisible}
                onChange={(e) => setUserProfile(prev => ({ ...prev, isLocationVisible: e.target.checked }))}
                className="rounded"
              />
              <span className="text-xs text-muted-foreground">Show location</span>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">{userProfile.bio}</p>
            <p className="text-sm text-muted-foreground">
              {userProfile.isLocationVisible ? userProfile.location : 'Location Hidden'} • Joined {userProfile.joinedDate}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <button 
            onClick={() => handleStatClick('aura')}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-lg font-bold text-purple-600">{userStats.aura}</div>
            <div className="text-xs text-muted-foreground">Aura</div>
          </button>
          <button 
            onClick={() => handleStatClick('rank')}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-lg font-bold text-amber-600">{userStats.rank}</div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </button>
          <button 
            onClick={() => handleStatClick('posts')}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-lg font-bold">{userStats.posts}</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </button>
          <button 
            onClick={() => handleStatClick('followers')}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-lg font-bold">{userStats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </button>
        </div>
        
        {isEditing && (
          <button
            onClick={handleSaveProfile}
            className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Save size={16} />
            Save Changes
          </button>
        )}
        
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform"
        >
          <Settings size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="glass-card p-4 rounded-2xl">
          <h3 className="font-semibold mb-4">Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profile Visibility</span>
              <select className="text-sm border rounded px-2 py-1">
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Online Status</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Current Mood Selector */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">{getCurrentMoodEmoji()}</span>
          Current Mood
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodChange(mood.id)}
              className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 ${
                userProfile.mood === mood.id 
                  ? 'glass-card-secondary scale-105 ring-2 ring-purple-500' 
                  : 'glass-card hover:glass-card-secondary hover:scale-105'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.name}</span>
            </button>
          ))}
        </div>
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
            <div className="flex gap-2 flex-wrap">
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
          {recentPosts.map((post) => (
            <div key={post.id} className="glass-card-secondary p-3 rounded-xl">
              <p className="text-sm mb-2">{post.content}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{post.timeAgo}</span>
                  <span className={`mood-badge bg-mood-${post.mood} text-white px-2 py-1 rounded-full`}>
                    {post.mood}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handlePostLike(post.id)}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    <Heart size={12} />
                    {post.likes}
                  </button>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
