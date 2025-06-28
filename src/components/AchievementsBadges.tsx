
import React from 'react';
import { Crown } from 'lucide-react';

interface Badge {
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

interface AchievementsBadgesProps {
  badges: Badge[];
}

const AchievementsBadges = ({ badges }: AchievementsBadgesProps) => {
  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Crown size={18} className="text-yellow-500" />
        Achievements
      </h3>
      <div className="grid gap-3">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className={`glass-card-secondary p-3 rounded-xl flex items-center gap-3 transition-all ${
              badge.earned ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <span className="text-2xl">{badge.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{badge.name}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
            {badge.earned && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsBadges;
