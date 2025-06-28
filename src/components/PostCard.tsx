
import React, { useState } from 'react';
import { Heart, MessageCircle, ArrowUp, Send } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

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

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { likePost, addComment, addReply } = useAppContext();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const moodColors = {
    cranky: 'bg-mood-cranky',
    chill: 'bg-mood-chill',
    productive: 'bg-mood-productive',
    lost: 'bg-mood-lost',
    excited: 'bg-mood-excited',
    zen: 'bg-mood-zen',
  };

  const echosenseColors = {
    uplifting: 'text-green-600',
    contemplative: 'text-blue-600',
    nostalgic: 'text-amber-600',
  };

  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment('');
    }
  };

  const handleReply = (commentId: string) => {
    if (replyContent.trim()) {
      addReply(post.id, commentId, replyContent);
      setReplyContent('');
      setReplyTo(null);
    }
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.user}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-sm">{post.user}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.timeAgo}</span>
              <span className={`mood-badge ${moodColors[post.mood as keyof typeof moodColors]} text-white`}>
                {post.mood}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-purple-600">{post.aura} aura</div>
          <div className={`text-xs ${echosenseColors[post.echosense as keyof typeof echosenseColors]}`}>
            {post.echosense}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/20">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              post.isLiked 
                ? 'text-red-500' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
            <span className="text-xs">{post.reactions.hearts}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={16} />
            <span className="text-xs">{post.reactions.comments}</span>
          </button>
        </div>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-purple-500 transition-colors">
          <ArrowUp size={16} />
          <span className="text-xs">Boost ({post.reactions.boosts})</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/20">
          {/* Add Comment */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 glass-card-secondary rounded-xl text-sm outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!newComment.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="glass-card-secondary p-3 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                        <span className="text-xs text-purple-600 font-medium">+{comment.aura} aura</span>
                      </div>
                      <p className="text-sm text-foreground">{comment.content}</p>
                    </div>
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="text-xs text-muted-foreground hover:text-blue-500 mt-1 ml-3"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                {/* Reply Input */}
                {replyTo === comment.id && (
                  <div className="flex gap-2 ml-11">
                    <input
                      type="text"
                      placeholder="Reply to comment..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="flex-1 px-3 py-2 glass-card-secondary rounded-xl text-sm outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleReply(comment.id)}
                    />
                    <button
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <img
                          src={reply.avatar}
                          alt={reply.user}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="glass-card-secondary p-2 rounded-xl flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">{reply.user}</span>
                            <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                          </div>
                          <p className="text-xs text-foreground">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
