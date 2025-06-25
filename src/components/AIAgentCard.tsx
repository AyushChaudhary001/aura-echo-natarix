
import React from 'react';

interface AIAgentCardProps {
  currentMood: string;
}

const AIAgentCard = ({ currentMood }: AIAgentCardProps) => {
  const moodResponses = {
    cranky: {
      message: "Want to vent about something? I'm here to listen 🫂",
      suggestion: "Maybe check out r/OffMyChest or share what's bothering you"
    },
    chill: {
      message: "Good vibes! Want to discover some cool communities? ✨",
      suggestion: "Explore trending posts or find local hangout spots"
    },
    productive: {
      message: "You're on fire! 🔥 Share your wins with the community",
      suggestion: "Post about your progress or join productivity challenges"
    },
    lost: {
      message: "It's okay to feel uncertain. You're not alone in this journey 🌟",
      suggestion: "Connect with others who understand or explore mindfulness communities"
    },
    excited: {
      message: "Your energy is contagious! What's got you pumped? ⚡",
      suggestion: "Share your excitement or find others who share your interests"
    },
    zen: {
      message: "Beautiful inner peace 🧘‍♀️ Want to spread some calm?",
      suggestion: "Share wisdom or join meditation communities"
    }
  };

  const currentResponse = moodResponses[currentMood as keyof typeof moodResponses] || moodResponses.chill;

  return (
    <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-400">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm text-purple-700 mb-1">Natarix Assistant</h4>
          <p className="text-sm text-foreground mb-2">{currentResponse.message}</p>
          <p className="text-xs text-muted-foreground">{currentResponse.suggestion}</p>
        </div>
      </div>
    </div>
  );
};

export default AIAgentCard;
