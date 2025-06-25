
import React from 'react';
import { Sparkles, Gift, MessageCircle, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuraItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  category: 'boost' | 'social' | 'premium';
}

const AuraMarketplace = () => {
  const [userAura] = React.useState(1247);

  const auraItems: AuraItem[] = [
    {
      id: '1',
      name: 'Highlight Post',
      description: 'Make your post glow for 24 hours',
      cost: 50,
      icon: <Zap size={20} className="text-yellow-500" />,
      category: 'boost'
    },
    {
      id: '2',
      name: 'Gift Badge',
      description: 'Send a special badge to someone',
      cost: 25,
      icon: <Gift size={20} className="text-pink-500" />,
      category: 'social'
    },
    {
      id: '3',
      name: 'Unlock DMs',
      description: 'Message users outside your aura level',
      cost: 100,
      icon: <MessageCircle size={20} className="text-blue-500" />,
      category: 'social'
    },
    {
      id: '4',
      name: 'Premium Sub-club',
      description: 'Create exclusive sub-community',
      cost: 500,
      icon: <Crown size={20} className="text-purple-500" />,
      category: 'premium'
    }
  ];

  const handlePurchase = (item: AuraItem) => {
    if (userAura >= item.cost) {
      console.log('Purchasing:', item.name);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'boost': return 'bg-yellow-100 text-yellow-700';
      case 'social': return 'bg-blue-100 text-blue-700';
      case 'premium': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Aura Balance */}
      <div className="glass-card p-4 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={24} className="text-purple-500" />
          <h2 className="text-xl font-bold">Boost & Rewards</h2>
        </div>
        <div className="text-2xl font-bold text-purple-600 mb-1">{userAura}</div>
        <div className="text-sm text-muted-foreground">Your Aura Balance</div>
      </div>

      {/* Marketplace Items */}
      <div className="space-y-3">
        {auraItems.map((item) => (
          <div key={item.id} className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 glass-card-secondary rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600 mb-1">{item.cost}</div>
                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={userAura < item.cost}
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  {userAura >= item.cost ? 'Buy' : 'Not enough'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuraMarketplace;
