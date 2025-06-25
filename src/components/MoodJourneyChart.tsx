
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MoodDay {
  date: string;
  mood: string;
  posts: number;
  emoji: string;
}

interface MoodJourneyChartProps {
  moodHistory: MoodDay[];
}

const MoodJourneyChart = ({ moodHistory }: MoodJourneyChartProps) => {
  const moodColors = {
    cranky: 'bg-red-100 text-red-700',
    chill: 'bg-blue-100 text-blue-700',
    productive: 'bg-green-100 text-green-700',
    lost: 'bg-purple-100 text-purple-700',
    excited: 'bg-yellow-100 text-yellow-700',
    zen: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <TrendingUp size={18} className="text-blue-500" />
        Mood Journey
      </h3>
      
      {/* Visual mood timeline */}
      <div className="flex items-end justify-between mb-4 h-20">
        {moodHistory.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div 
              className={`w-6 rounded-full ${moodColors[day.mood as keyof typeof moodColors]} flex items-center justify-center text-xs font-bold transition-all hover:scale-110`}
              style={{ height: `${Math.max(20, (day.posts * 15) + 20)}px` }}
            >
              {day.posts}
            </div>
            <span className="text-lg">{day.emoji}</span>
            <span className="text-xs text-muted-foreground">{day.date}</span>
          </div>
        ))}
      </div>

      {/* Detailed breakdown */}
      <div className="space-y-2">
        {moodHistory.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{day.emoji}</span>
              <span className="text-sm capitalize">{day.mood}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{day.date}</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {day.posts} posts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodJourneyChart;
