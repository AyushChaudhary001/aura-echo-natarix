
import React from 'react';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  const moods = [
    { id: 'cranky', label: 'Cranky', emoji: '😤', color: 'bg-mood-cranky' },
    { id: 'chill', label: 'Chill', emoji: '😎', color: 'bg-mood-chill' },
    { id: 'productive', label: 'Productive', emoji: '🚀', color: 'bg-mood-productive' },
    { id: 'lost', label: 'Lost', emoji: '🌊', color: 'bg-mood-lost' },
    { id: 'excited', label: 'Excited', emoji: '⚡', color: 'bg-mood-excited' },
    { id: 'zen', label: 'Zen', emoji: '🧘', color: 'bg-mood-zen' },
  ];

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Vibe Right Now</h3>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={`mood-badge flex-shrink-0 flex items-center gap-2 transition-all duration-200 ${
              selectedMood === mood.id
                ? `${mood.color} text-white shadow-lg scale-105`
                : 'bg-white/50 text-muted-foreground hover:bg-white/70'
            }`}
          >
            <span className="text-sm">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
