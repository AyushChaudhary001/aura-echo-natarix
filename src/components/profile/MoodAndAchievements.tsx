
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Crown, Activity } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import MoodJourneyChart from '../MoodJourneyChart';
import AchievementsBadges from '../AchievementsBadges';

interface MoodAndAchievementsProps {
  userProfile: {
    mood: string;
  };
  onMoodChange: (mood: string) => void;
  moodHistory: any[];
  badges: any[];
}

const MoodAndAchievements = ({ userProfile, onMoodChange, moodHistory, badges }: MoodAndAchievementsProps) => {
  const [showMoodJourney, setShowMoodJourney] = useState(false);
  const [activeTab, setActiveTab] = useState('mood');

  const moods = [
    { id: 'productive', name: 'Productive', emoji: '💪', color: 'bg-green-500' },
    { id: 'chill', name: 'Chill', emoji: '😌', color: 'bg-blue-500' },
    { id: 'excited', name: 'Excited', emoji: '🤩', color: 'bg-yellow-500' },
    { id: 'zen', name: 'Zen', emoji: '🧘', color: 'bg-purple-500' },
    { id: 'cranky', name: 'Cranky', emoji: '😤', color: 'bg-red-500' },
    { id: 'lost', name: 'Lost', emoji: '😕', color: 'bg-gray-500' }
  ];

  const getCurrentMoodEmoji = () => {
    const currentMood = moods.find(m => m.id === userProfile.mood);
    return currentMood?.emoji || '😐';
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 glass-card rounded-xl">
        <button
          onClick={() => setActiveTab('mood')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'mood' 
              ? 'bg-white shadow-sm text-purple-600' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Activity size={16} className="inline mr-2" />
          Current Mood
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'achievements' 
              ? 'bg-white shadow-sm text-purple-600' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Crown size={16} className="inline mr-2" />
          Achievements
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'mood' && (
        <div className="glass-card p-4 rounded-2xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">{getCurrentMoodEmoji()}</span>
            Current Mood
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => onMoodChange(mood.id)}
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

          {/* Mood Journey Collapsible */}
          <Collapsible open={showMoodJourney} onOpenChange={setShowMoodJourney}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Mood Journey</span>
              </div>
              {showMoodJourney ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="pl-6">
                <MoodJourneyChart moodHistory={moodHistory} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="glass-card p-4 rounded-2xl">
          <AchievementsBadges badges={badges} />
        </div>
      )}
    </div>
  );
};

export default MoodAndAchievements;
