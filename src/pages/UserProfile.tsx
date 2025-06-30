
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ProfileHeader from '../components/profile/ProfileHeader';
import MoodAndAchievements from '../components/profile/MoodAndAchievements';
import PostHistoryPanel from '../components/profile/PostHistoryPanel';
import { useAppContext } from '../contexts/AppContext';

const UserProfile = () => {
  const { currentUser } = useAppContext();
  
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

  const handleMoodChange = (newMood: string) => {
    setUserProfile(prev => ({ ...prev, mood: newMood }));
    console.log('Mood changed to:', newMood);
  };

  const handleStatClick = (statType: string) => {
    console.log(`Clicked on ${statType} stat`);
  };

  const handleProfileUpdate = (newProfile: any) => {
    setUserProfile(newProfile);
    console.log('Profile updated:', newProfile);
  };

  const handleAvatarUpdate = (newAvatar: any) => {
    setSelectedAvatar(newAvatar);
    console.log('Avatar updated:', newAvatar);
  };

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Profile Header */}
      <ProfileHeader
        userProfile={userProfile}
        userStats={userStats}
        selectedAvatar={selectedAvatar}
        onProfileUpdate={handleProfileUpdate}
        onAvatarUpdate={handleAvatarUpdate}
        onStatClick={handleStatClick}
      />

      {/* Main Content Tabs */}
      <Tabs defaultValue="mood" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 glass-card">
          <TabsTrigger value="mood" className="data-[state=active]:glass-card-secondary">
            Mood & Achievements
          </TabsTrigger>
          <TabsTrigger value="posts" className="data-[state=active]:glass-card-secondary">
            Post History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-4">
          <MoodAndAchievements
            userProfile={userProfile}
            onMoodChange={handleMoodChange}
            moodHistory={moodHistory}
            badges={badges}
          />
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="glass-card p-4 rounded-2xl">
            <h3 className="font-semibold mb-4">Your Posts</h3>
            <PostHistoryPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
