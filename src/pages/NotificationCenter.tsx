
import React, { useState } from 'react';
import { Heart, MessageCircle, Crown, Sparkles, Bell, UserPlus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import FriendRequestCard from '../components/FriendRequestCard';

interface Notification {
  id: string;
  type: 'dm' | 'reaction' | 'moderator' | 'aura';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
}

const NotificationCenter = () => {
  const navigate = useNavigate();
  const { friendRequests } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'reaction',
      title: 'priya_artist loved your post',
      description: 'Just finished a coding session...',
      timeAgo: '2m ago',
      isRead: false
    },
    {
      id: '2',
      type: 'dm',
      title: 'New message from tech_guru',
      description: 'Hey, loved your post about...',
      timeAgo: '5m ago',
      isRead: false
    },
    {
      id: '3',
      type: 'aura',
      title: 'Aura reward received!',
      description: '+25 aura for helpful comment',
      timeAgo: '1h ago',
      isRead: true
    },
    {
      id: '4',
      type: 'moderator',
      title: 'Moderator mention',
      description: 'You were mentioned in Mumbai Foodies',
      timeAgo: '2h ago',
      isRead: true
    },
    {
      id: '5',
      type: 'reaction',
      title: 'rahul_dev boosted your post',
      description: 'Sometimes I feel like I\'m floating...',
      timeAgo: '3h ago',
      isRead: true
    },
    {
      id: '6',
      type: 'aura',
      title: 'Daily streak bonus!',
      description: '+10 aura for 7-day streak',
      timeAgo: '1d ago',
      isRead: true
    }
  ];

  const pendingRequests = friendRequests.filter(req => req.status === 'pending');
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'reaction': return <Heart size={20} className="text-red-500" />;
      case 'dm': return <MessageCircle size={20} className="text-blue-500" />;
      case 'moderator': return <Crown size={20} className="text-yellow-500" />;
      case 'aura': return <Sparkles size={20} className="text-purple-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-glass-fade-in">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">Stay updated with your community</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-2xl font-medium transition-all ${
              filter === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'glass-card-secondary hover:scale-105'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-2xl font-medium transition-all ${
              filter === 'unread' 
                ? 'bg-primary text-primary-foreground' 
                : 'glass-card-secondary hover:scale-105'
            }`}
          >
            Unread ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>
      </div>

      {/* Friend Requests */}
      {pendingRequests.length > 0 && (
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus size={24} className="text-blue-500" />
            <h2 className="text-xl font-bold">Friend Requests</h2>
          </div>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <FriendRequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="glass-card rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                !notification.isRead 
                  ? 'glass-card-secondary border-primary/30' 
                  : 'glass-card border-white/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 glass-card rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification.title}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {notification.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
