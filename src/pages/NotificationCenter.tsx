
import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, Users, Award } from 'lucide-react';

const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'reactions', label: 'Reactions' },
    { id: 'comments', label: 'Comments' },
    { id: 'communities', label: 'Communities' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const notifications = [
    {
      id: '1',
      type: 'reaction',
      icon: Heart,
      title: 'priya_artist loved your post',
      description: '"Just finished a coding session..."',
      time: '5m ago',
      isRead: false,
      aura: '+12'
    },
    {
      id: '2',
      type: 'comment',
      icon: MessageCircle,
      title: 'tech_guru commented on your post',
      description: 'What bug were you working on?',
      time: '1h ago',
      isRead: false,
      aura: '+8'
    },
    {
      id: '3',
      type: 'achievement',
      icon: Award,
      title: 'New badge earned!',
      description: 'Night Owl - Posted after midnight',
      time: '2h ago',
      isRead: true,
      aura: '+50'
    },
    {
      id: '4',
      type: 'community',
      icon: Users,
      title: 'Invited to "Mumbai Developers"',
      description: 'rahul_dev invited you to join',
      time: '4h ago',
      isRead: true,
      aura: null
    },
    {
      id: '5',
      type: 'mood_shift',
      icon: Bell,
      title: 'Mood shift detected',
      description: 'Feeling more productive lately? Share what\'s working!',
      time: '1d ago',
      isRead: true,
      aura: null
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reaction': return 'text-red-500';
      case 'comment': return 'text-blue-500';
      case 'achievement': return 'text-yellow-500';
      case 'community': return 'text-green-500';
      default: return 'text-purple-500';
    }
  };

  return (
    <div className="space-y-4 animate-glass-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Notifications</h1>
        <p className="text-sm text-muted-foreground">Stay updated with your community</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`mood-badge flex-shrink-0 transition-all duration-200 ${
              filter === filterOption.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-white/50 text-muted-foreground hover:bg-white/70'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Mark All as Read */}
      <div className="flex justify-end">
        <button className="text-sm text-primary hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`glass-card p-4 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                !notification.isRead ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full glass-card-secondary ${getNotificationColor(notification.type)}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {notification.aura && (
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {notification.aura}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  
                  {notification.type === 'community' && (
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                        Accept
                      </button>
                      <button className="px-3 py-1 glass-card-secondary text-muted-foreground rounded-full text-xs">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center py-4">
        <button className="text-sm text-primary hover:underline">
          Load more notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
