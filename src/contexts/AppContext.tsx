
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  aura: number;
}

interface Post {
  id: string;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  mood: string;
  aura: number;
  echosense: string;
  timeAgo: string;
  reactions: {
    hearts: number;
    boosts: number;
    comments: number;
  };
  isLiked?: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timeAgo: string;
  aura: number;
  replies?: Comment[];
}

interface FriendRequest {
  id: string;
  from: User;
  status: 'pending' | 'accepted' | 'declined';
}

interface AppContextType {
  posts: Post[];
  friendRequests: FriendRequest[];
  currentUser: User;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addReply: (postId: string, commentId: string, content: string) => void;
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
  createPost: (content: string, mood: string, image?: string, location?: string) => void;
  joinCommunity: (communityId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser] = useState<User>({
    id: 'current-user',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    aura: 420
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: 'rahul_dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'Just finished a coding session at 2 AM. The satisfaction of solving that bug is unmatched! 🚀',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      mood: 'productive',
      aura: 142,
      echosense: 'uplifting',
      timeAgo: '2h',
      reactions: { hearts: 23, boosts: 5, comments: 2 },
      isLiked: false,
      comments: [
        {
          id: '1',
          user: 'priya_artist',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
          content: 'This is so relatable! Nothing beats that eureka moment 💡',
          timeAgo: '1h',
          aura: 15
        }
      ]
    },
    {
      id: '2',
      user: 'priya_artist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      content: 'Sometimes I feel like I\'m floating in this vast universe, trying to find my purpose. Anyone else feel this way?',
      mood: 'lost',
      aura: 89,
      echosense: 'contemplative',
      timeAgo: '4h',
      reactions: { hearts: 67, boosts: 12, comments: 5 },
      isLiked: true,
      comments: []
    }
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      from: {
        id: 'user1',
        name: 'tech_guru',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        aura: 890
      },
      status: 'pending'
    }
  ]);

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          reactions: {
            ...post.reactions,
            hearts: post.reactions.hearts + (isLiked ? 1 : -1)
          }
        };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      content,
      timeAgo: 'now',
      aura: 5
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
          reactions: {
            ...post.reactions,
            comments: post.reactions.comments + 1
          }
        };
      }
      return post;
    }));
  };

  const addReply = (postId: string, commentId: string, content: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      content,
      timeAgo: 'now',
      aura: 3
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const sendFriendRequest = (userId: string) => {
    console.log('Friend request sent to:', userId);
    // In real app, this would call an API
  };

  const acceptFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
  };

  const declineFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'declined' } : req
    ));
  };

  const createPost = (content: string, mood: string, image?: string, location?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      content,
      image,
      mood,
      aura: 0,
      echosense: 'uplifting',
      timeAgo: 'now',
      reactions: { hearts: 0, boosts: 0, comments: 0 },
      isLiked: false,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const joinCommunity = (communityId: string) => {
    console.log('Joined community:', communityId);
    // In real app, this would call an API
  };

  return (
    <AppContext.Provider value={{
      posts,
      friendRequests,
      currentUser,
      likePost,
      addComment,
      addReply,
      sendFriendRequest,
      acceptFriendRequest,
      declineFriendRequest,
      createPost,
      joinCommunity
    }}>
      {children}
    </AppContext.Provider>
  );
};
