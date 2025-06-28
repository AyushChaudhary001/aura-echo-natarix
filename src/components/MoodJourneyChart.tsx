
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MoodDay {
  date: string;
  mood: string;
  posts: number;
}

interface MoodJourneyChartProps {
  moodHistory: MoodDay[];
}

const MoodJourneyChart = ({ moodHistory }: MoodJourneyChartProps) => {
  const moodEmojis: Record<string, string> = {
    cranky: '😤',
    chill: '😌',
    productive: '💪',
    lost: '😕',
    excited: '🤩',
    zen: '🧘'
  };

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <TrendingUp size={18} className="text-blue-500" />
        Mood Journey
      </h3>
      <div className="space-y-3">
        {moodHistory.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">{moodEmojis[day.mood] || '😐'}</span>
              <div>
                <span className="text-sm font-medium">{day.date}</span>
                <div className="text-xs text-muted-foreground capitalize">{day.mood}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {day.posts} post{day.posts !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodJourneyChart;
