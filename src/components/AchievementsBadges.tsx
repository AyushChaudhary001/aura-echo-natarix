
import React from 'react';
import { Crown, Award } from 'lucide-react';

interface Badge {
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  auraEarned: number;
}

interface AchievementsBadgesProps {
  badges: Badge[];
}

const AchievementsBadges = ({ badges }: AchievementsBadgesProps) => {
  const rarityStyles = {
    common: 'bg-gray-100 text-gray-700 border-gray-200',
    rare: 'bg-blue-100 text-blue-700 border-blue-200',
    epic: 'bg-purple-100 text-purple-700 border-purple-200',
    legendary: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-200'
  };

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Crown size={18} className="text-yellow-500" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${rarityStyles[badge.rarity]}`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <h4 className="font-medium text-xs mb-1">{badge.name}</h4>
              <p className="text-xs opacity-80 mb-2">{badge.description}</p>
              <div className="flex items-center justify-center gap-1">
                <Award size={10} />
                <span className="text-xs">+{badge.auraEarned}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsBadges;
