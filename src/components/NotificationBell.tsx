
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import { useAppContext } from '../contexts/AppContext';

const NotificationBell = () => {
  const { friendRequests } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const pendingRequests = friendRequests.filter(req => req.status === 'pending');
  const hasNotifications = pendingRequests.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full glass-card-secondary hover:scale-110 transition-transform relative"
      >
        <Bell size={20} className="text-muted-foreground" />
        {hasNotifications && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs text-white font-bold">{pendingRequests.length}</span>
          </div>
        )}
      </button>
      
      {isOpen && (
        <NotificationDropdown onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default NotificationBell;
