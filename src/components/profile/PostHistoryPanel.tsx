
import React, { useState } from 'react';
import { Calendar, Filter, Heart, MessageCircle, Share, Trash2 } from 'lucide-react';

interface Post {
  id: number;
  content: string;
  community: string;
  mood: string;
  timeAgo: string;
  likes: number;
  comments: number;
  communityIcon: string;
}

const PostHistoryPanel = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const posts: Post[] = [
    {
      id: 1,
      content: "Just finished a coding session at 2 AM... Sometimes the best solutions come when you're in the zone! 💻",
      community: 'Tech Talk',
      mood: 'productive',
      timeAgo: '2h ago',
      likes: 12,
      comments: 3,
      communityIcon: '💻'
    },
    {
      id: 2,
      content: "Weather is perfect for outdoor workouts today. Nothing beats fresh air and movement! 🌞",
      community: 'Fitness Hub',
      mood: 'excited',
      timeAgo: '1d ago',
      likes: 8,
      comments: 1,
      communityIcon: '💪'
    },
    {
      id: 3,
      content: "Finally solved that bug that was haunting me for days! Persistence pays off. 🎉",
      community: 'Tech Talk',
      mood: 'excited',
      timeAgo: '2d ago',
      likes: 15,
      comments: 5,
      communityIcon: '💻'
    },
    {
      id: 4,
      content: "Reading this amazing book about mindfulness. Highly recommend taking time for yourself! 📚",
      community: 'Book Club',
      mood: 'zen',
      timeAgo: '3d ago',
      likes: 6,
      comments: 2,
      communityIcon: '📚'
    },
    {
      id: 5,
      content: "Discovered this new coffee shop with incredible ambiance. Perfect for creative work! ☕",
      community: 'Creative Corner',
      mood: 'chill',
      timeAgo: '5d ago',
      likes: 9,
      comments: 4,
      communityIcon: '🎨'
    }
  ];

  const communities = ['all', 'Tech Talk', 'Fitness Hub', 'Book Club', 'Creative Corner'];
  const moods = ['all', 'productive', 'excited', 'zen', 'chill', 'cranky', 'lost'];

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      productive: '💪',
      excited: '🤩',
      zen: '🧘',
      chill: '😌',
      cranky: '😤',
      lost: '😕'
    };
    return moodMap[mood] || '😐';
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.community === filter || post.mood === filter;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'most-liked') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 items-center flex-wrap">
        <Filter size={16} className="text-muted-foreground" />
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="all">All Communities</option>
          {communities.slice(1).map(community => (
            <option key={community} value={community}>{community}</option>
          ))}
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most-liked">Most Liked</option>
        </select>
      </div>

      {/* Posts */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedPosts.map((post) => (
          <div key={post.id} className="glass-card-secondary p-4 rounded-xl hover:scale-105 transition-transform">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-lg">{post.communityIcon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-purple-600">{post.community}</span>
                  <span className="text-lg">{getMoodEmoji(post.mood)}</span>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors text-xs">
                      <Heart size={12} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors text-xs">
                      <MessageCircle size={12} />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-500 transition-colors text-xs">
                      <Share size={12} />
                    </button>
                  </div>
                  
                  <button className="p-1 hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar size={48} className="mx-auto mb-2 opacity-50" />
          <p>No posts found with current filters</p>
        </div>
      )}
    </div>
  );
};

export default PostHistoryPanel;
