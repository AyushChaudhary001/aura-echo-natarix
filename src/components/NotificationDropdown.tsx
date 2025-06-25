import React from 'react';
import { Heart, MessageCircle, Crown, Sparkles, X, Bell } from 'lucide-react';

interface Notification {
  id: string;
  type: 'dm' | 'reaction' | 'moderator' | 'aura';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
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
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'reaction': return <Heart size={16} className="text-red-500" />;
      case 'dm': return <MessageCircle size={16} className="text-blue-500" />;
      case 'moderator': return <Crown size={16} className="text-yellow-500" />;
      case 'aura': return <Sparkles size={16} className="text-purple-500" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute top-12 right-0 w-80 max-w-[90vw] glass-card rounded-2xl border border-white/30 shadow-xl z-50 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Notifications</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-80">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-white/10 hover:bg-white/20 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 glass-card-secondary rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium truncate ${
                      !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {notification.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.description}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t border-white/20">
          <button className="w-full text-center text-sm text-primary hover:underline">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
