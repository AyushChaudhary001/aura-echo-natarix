
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CommunityCard from '../components/CommunityCard';

const CommunityExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('trending');

  const filters = [
    { id: 'trending', label: 'Trending' },
    { id: 'mood', label: 'Mood-based' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'new', label: 'New' },
  ];

  const mockCommunities = [
    {
      id: '1',
      name: 'Mumbai Night Owls',
      description: 'For those who come alive after midnight in the city of dreams',
      members: '2.3k',
      mood: 'chill',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=200&fit=crop',
      isLocal: true
    },
    {
      id: '2',
      name: 'Productive Minds',
      description: 'Share your wins, challenges, and productivity hacks',
      members: '5.7k',
      mood: 'productive',
      location: null,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      isLocal: false
    },
    {
      id: '3',
      name: 'Bengaluru Foodies',
      description: 'Best eats in the Silicon Valley of India',
      members: '12k',
      mood: 'excited',
      location: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
      isLocal: true
    },
    {
      id: '4',
      name: 'Lost & Found Stories',
      description: 'A safe space to share when life feels uncertain',
      members: '890',
      mood: 'lost',
      location: null,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      isLocal: false
    }
  ];

  return (
    <div className="space-y-4 animate-glass-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Explore Communities</h1>
        <p className="text-sm text-muted-foreground">Find your tribe, discover new perspectives</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-3 rounded-2xl">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search communities with AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`mood-badge flex-shrink-0 transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-white/50 text-muted-foreground hover:bg-white/70'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Create Community Button */}
      <button className="w-full glass-card p-4 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
        <div className="text-center">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-medium text-sm mb-1">Create Your Community</h3>
          <p className="text-xs text-muted-foreground">Start a space for your interests</p>
        </div>
      </button>

      {/* Communities Grid */}
      <div className="space-y-4">
        {mockCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};

export default CommunityExplorer;
