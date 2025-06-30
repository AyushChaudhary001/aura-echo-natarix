
import React, { useState } from 'react';
import { Settings, Edit2, Plus, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import AvatarCustomizationPanel from './AvatarCustomizationPanel';
import CreatePostPanel from './CreatePostPanel';

interface ProfileHeaderProps {
  userProfile: {
    username: string;
    bio: string;
    location: string;
    joinedDate: string;
    isLocationVisible: boolean;
    mood: string;
  };
  userStats: {
    aura: number;
    rank: string;
    posts: number;
    communities: number;
    followers: number;
    following: number;
  };
  selectedAvatar: {
    style: string;
    color: string;
    icon: string;
  };
  onProfileUpdate: (profile: any) => void;
  onAvatarUpdate: (avatar: any) => void;
  onStatClick: (statType: string) => void;
}

const ProfileHeader = ({
  userProfile,
  userStats,
  selectedAvatar,
  onProfileUpdate,
  onAvatarUpdate,
  onStatClick
}: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);

  const avatarColors = [
    { id: 'purple-blue', name: 'Purple Blue', class: 'from-purple-500 to-blue-500' },
    { id: 'pink-orange', name: 'Pink Orange', class: 'from-pink-500 to-orange-500' },
    { id: 'green-teal', name: 'Green Teal', class: 'from-green-500 to-teal-500' },
    { id: 'red-pink', name: 'Red Pink', class: 'from-red-500 to-pink-500' },
    { id: 'blue-purple', name: 'Blue Purple', class: 'from-blue-500 to-purple-500' },
    { id: 'yellow-red', name: 'Yellow Red', class: 'from-yellow-500 to-red-500' }
  ];

  const moods = [
    { id: 'productive', name: 'Productive', emoji: '💪', color: 'bg-green-500' },
    { id: 'chill', name: 'Chill', emoji: '😌', color: 'bg-blue-500' },
    { id: 'excited', name: 'Excited', emoji: '🤩', color: 'bg-yellow-500' },
    { id: 'zen', name: 'Zen', emoji: '🧘', color: 'bg-purple-500' },
    { id: 'cranky', name: 'Cranky', emoji: '😤', color: 'bg-red-500' },
    { id: 'lost', name: 'Lost', emoji: '😕', color: 'bg-gray-500' }
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

  const getCurrentMoodEmoji = () => {
    const currentMood = moods.find(m => m.id === userProfile.mood);
    return currentMood?.emoji || '😐';
  };

  const getCurrentMoodColor = () => {
    const currentMood = moods.find(m => m.id === userProfile.mood);
    return currentMood?.color || 'bg-gray-500';
  };

  const handleSaveProfile = () => {
    onProfileUpdate(tempProfile);
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-6 rounded-2xl text-center relative">
      {/* Avatar with mood indicator */}
      <div className="relative inline-block mb-4">
        <div className={`w-20 h-20 rounded-full ${getAvatarClass()} flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 cursor-pointer`}>
          <span className="text-2xl text-white font-bold">{selectedAvatar.icon}</span>
        </div>
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getCurrentMoodColor()} rounded-full border-2 border-white animate-pulse flex items-center justify-center text-xs`}>
          {getCurrentMoodEmoji()}
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex items-center justify-center gap-2 mb-1">
        {isEditing ? (
          <input
            type="text"
            value={tempProfile.username}
            onChange={(e) => setTempProfile(prev => ({ ...prev, username: e.target.value }))}
            className="text-xl font-bold bg-transparent text-center border-b border-gray-300 focus:outline-none focus:border-purple-500"
          />
        ) : (
          <h2 className="text-xl font-bold">{userProfile.username}</h2>
        )}
        
        {/* Edit Profile Button - Opens Avatar Customization */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <Edit2 size={14} className="text-gray-500" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96 glass-card border-l border-white/20">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Edit2 size={18} />
                Customize Profile
              </SheetTitle>
            </SheetHeader>
            <AvatarCustomizationPanel 
              selectedAvatar={selectedAvatar}
              onAvatarUpdate={onAvatarUpdate}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Bio and Location */}
      {isEditing ? (
        <div className="space-y-2 mb-4">
          <textarea
            value={tempProfile.bio}
            onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full text-sm bg-transparent text-center border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-purple-500 resize-none"
            rows={2}
            placeholder="Tell us about yourself..."
          />
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              checked={tempProfile.isLocationVisible}
              onChange={(e) => setTempProfile(prev => ({ ...prev, isLocationVisible: e.target.checked }))}
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

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <button 
          onClick={() => onStatClick('aura')}
          className="text-center hover:scale-105 transition-transform"
        >
          <div className="text-lg font-bold text-purple-600">{userStats.aura}</div>
          <div className="text-xs text-muted-foreground">Aura</div>
        </button>
        <button 
          onClick={() => onStatClick('rank')}
          className="text-center hover:scale-105 transition-transform"
        >
          <div className="text-lg font-bold text-amber-600">{userStats.rank}</div>
          <div className="text-xs text-muted-foreground">Rank</div>
        </button>
        <button 
          onClick={() => onStatClick('posts')}
          className="text-center hover:scale-105 transition-transform"
        >
          <div className="text-lg font-bold">{userStats.posts}</div>
          <div className="text-xs text-muted-foreground">Posts</div>
        </button>
        <button 
          onClick={() => onStatClick('followers')}
          className="text-center hover:scale-105 transition-transform"
        >
          <div className="text-lg font-bold">{userStats.followers}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-center mb-4">
        {isEditing ? (
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            Save Changes
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
            
            {/* Create Post Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                  <Plus size={16} />
                  Post
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] glass-card border-t border-white/20">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Sparkles size={18} />
                    Create New Post
                  </SheetTitle>
                </SheetHeader>
                <CreatePostPanel />
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>

      {/* Settings Button */}
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform"
      >
        <Settings size={18} className="text-muted-foreground" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 glass-card p-4 rounded-2xl w-64 z-10 animate-slide-in-right">
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
    </div>
  );
};

export default ProfileHeader;
