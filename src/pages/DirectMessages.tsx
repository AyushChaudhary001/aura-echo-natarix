
import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';

const DirectMessages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: '1',
      user: 'priya_artist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'That coding post was inspiring!',
      time: '2m',
      unread: 2,
      auraLevel: 'unlocked'
    },
    {
      id: '2',
      user: 'mumbai_foodie',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Want to check out that new place?',
      time: '1h',
      unread: 0,
      auraLevel: 'unlocked'
    },
    {
      id: '3',
      user: 'tech_guru',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Need 500 more aura to unlock...',
      time: '3h',
      unread: 0,
      auraLevel: 'locked'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'priya_artist',
      content: 'Hey! Loved your late night coding post 🚀',
      time: '10:30 PM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'me',
      content: 'Thanks! It was one of those breakthrough moments',
      time: '10:32 PM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'priya_artist',
      content: 'I totally get that feeling. What were you working on?',
      time: '10:33 PM',
      isOwn: false
    }
  ];

  const aiSuggestions = [
    'That sounds amazing!',
    'Tell me more about it',
    'I can relate to that',
    'Thanks for sharing!'
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-glass-fade-in">
      {!selectedChat ? (
        // Chat List View
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Messages</h1>
            <p className="text-sm text-muted-foreground">Connect with your community</p>
          </div>

          {/* Search */}
          <div className="glass-card p-3 rounded-2xl">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className="w-full glass-card p-4 rounded-2xl hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{conv.user}</h4>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className={`text-xs ${conv.auraLevel === 'locked' ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                      {conv.lastMessage}
                    </p>
                    {conv.auraLevel === 'locked' && (
                      <div className="mt-1">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          🔒 Unlock with more aura
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Chat View
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="glass-card p-4 rounded-2xl mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ←
              </button>
              <img
                src={conversations.find(c => c.id === selectedChat)?.avatar}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-sm">
                  {conversations.find(c => c.id === selectedChat)?.user}
                </h4>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isOwn
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'glass-card-secondary'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className={`text-xs ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'} block mt-1`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggestions */}
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-2">AI Suggestions:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="mood-badge bg-white/50 text-muted-foreground hover:bg-white/70 flex-shrink-0 text-xs"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="glass-card p-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <button className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectMessages;
