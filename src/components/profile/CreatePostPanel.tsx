
import React, { useState } from 'react';
import { Send, Sparkles, Image, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

const CreatePostPanel = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const communities = [
    { id: 'tech', name: 'Tech Talk', icon: '💻', members: '12.5k' },
    { id: 'creative', name: 'Creative Corner', icon: '🎨', members: '8.2k' },
    { id: 'fitness', name: 'Fitness Hub', icon: '💪', members: '15.3k' },
    { id: 'books', name: 'Book Club', icon: '📚', members: '6.8k' },
    { id: 'music', name: 'Music Lounge', icon: '🎵', members: '9.1k' }
  ];

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      const aiSuggestions = [
        "Just had an amazing breakthrough in my coding project! Sometimes the best solutions come when you least expect them. 💡",
        "Beautiful sunset today reminded me to take breaks and appreciate the little moments. Work-life balance is everything! 🌅",
        "Reading an incredible book that's changing my perspective on productivity. Anyone else love those 'aha!' moments? 📖",
        "Coffee shop vibes hit different when you're in the flow state. Where do you do your best thinking? ☕"
      ];
      setPostContent(aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]);
      setIsGeneratingAI(false);
    }, 2000);
  };

  const handlePost = () => {
    if (postContent.trim() && selectedCommunity) {
      console.log('Posting:', { content: postContent, community: selectedCommunity });
      // Here you would handle the actual posting logic
      setPostContent('');
      setSelectedCommunity('');
    }
  };

  return (
    <div className="space-y-4 mt-6 h-full flex flex-col">
      {/* Community Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">Post to Community</label>
        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => setSelectedCommunity(community.id)}
              className={`p-3 rounded-lg text-left transition-all duration-200 ${
                selectedCommunity === community.id
                  ? 'bg-purple-500 text-white'
                  : 'glass-card hover:glass-card-secondary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{community.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{community.name}</div>
                    <div className={`text-xs ${selectedCommunity === community.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {community.members} members
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Post Content */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium mb-2 block">What's on your mind?</label>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Share your thoughts, experiences, or ask a question..."
          className="flex-1 min-h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
        />
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAIGenerate}
            disabled={isGeneratingAI}
            className="flex items-center gap-2"
          >
            <Sparkles size={16} className={isGeneratingAI ? 'animate-spin' : ''} />
            {isGeneratingAI ? 'Generating...' : 'AI Generate'}
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Image size={16} />
            Image
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MapPin size={16} />
            Location
          </Button>
        </div>

        <Button 
          onClick={handlePost}
          disabled={!postContent.trim() || !selectedCommunity}
          className="flex items-center gap-2"
        >
          <Send size={16} />
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPanel;
