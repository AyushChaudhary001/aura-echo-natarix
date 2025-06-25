
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Crown, Shield, BarChart3, Flag, Award, UserPlus, Settings } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  avatar: string;
  aura: number;
  role: 'creator' | 'moderator' | 'member';
  joinedDate: string;
  isVerified: boolean;
  lastActive: string;
}

interface Post {
  id: string;
  content: string;
  author: string;
  status: 'pending' | 'approved' | 'flagged';
  reports: number;
  aura: number;
}

interface AdminDashboardProps {
  communityName: string;
  userRole: 'creator' | 'moderator';
  members: Member[];
  posts: Post[];
  children: React.ReactNode;
}

const AdminDashboard = ({ communityName, userRole, members, posts, children }: AdminDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState('members');

  const handlePromoteToMod = (memberId: string) => {
    console.log('Promoting to moderator:', memberId);
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Removing member:', memberId);
  };

  const handleApprovePost = (postId: string) => {
    console.log('Approving post:', postId);
  };

  const handleRewardAura = (memberId: string, amount: number) => {
    console.log('Rewarding aura:', memberId, amount);
  };

  const stats = {
    totalMembers: members.length,
    activeMods: members.filter(m => m.role === 'moderator').length,
    pendingPosts: posts.filter(p => p.status === 'pending').length,
    totalAura: members.reduce((sum, m) => sum + m.aura, 0)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-lg mx-auto rounded-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold flex items-center justify-center gap-2">
            <Crown size={20} className="text-yellow-500" />
            {communityName} Admin Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-card-secondary">
            <TabsTrigger value="members" className="text-xs">
              <Users size={14} className="mr-1" />
              Members
            </TabsTrigger>
            <TabsTrigger value="posts" className="text-xs">
              <Flag size={14} className="mr-1" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <BarChart3 size={14} className="mr-1" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="aura" className="text-xs">
              <Award size={14} className="mr-1" />
              Aura
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Manage Members ({stats.totalMembers})</h3>
              <Button size="sm" className="h-8 px-3">
                <UserPlus size={14} className="mr-1" />
                Invite
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {members.map((member) => (
                <div key={member.id} className="glass-card-secondary p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{member.name}</span>
                          {member.role === 'creator' && (
                            <Badge className="text-xs h-5 bg-yellow-100 text-yellow-700">
                              <Crown size={10} className="mr-1" />
                              Creator
                            </Badge>
                          )}
                          {member.role === 'moderator' && (
                            <Badge className="text-xs h-5 bg-blue-100 text-blue-700">
                              <Shield size={10} className="mr-1" />
                              Mod
                            </Badge>
                          )}
                          {member.isVerified && (
                            <Badge variant="secondary" className="text-xs h-5 bg-green-100 text-green-700">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.aura} aura • Active {member.lastActive}
                        </div>
                      </div>
                    </div>
                    
                    {userRole === 'creator' && member.role === 'member' && (
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handlePromoteToMod(member.id)}
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                        >
                          Make Mod
                        </Button>
                        <Button
                          onClick={() => handleRemoveMember(member.id)}
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs text-red-600"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Posts Management</h3>
              <Badge variant="secondary">{stats.pendingPosts} pending</Badge>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="glass-card-secondary p-3 rounded-xl">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{post.author}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={post.status === 'pending' ? 'secondary' : 
                                  post.status === 'approved' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {post.status}
                        </Badge>
                        {post.reports > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {post.reports} reports
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                    {post.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprovePost(post.id)}
                          size="sm"
                          className="h-7 px-3 text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-3 text-xs"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <h3 className="font-medium text-sm">Community Analytics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-secondary p-3 rounded-xl text-center">
                <div className="text-lg font-bold text-primary">{stats.totalMembers}</div>
                <div className="text-xs text-muted-foreground">Total Members</div>
              </div>
              <div className="glass-card-secondary p-3 rounded-xl text-center">
                <div className="text-lg font-bold text-blue-600">{stats.activeMods}</div>
                <div className="text-xs text-muted-foreground">Active Mods</div>
              </div>
              <div className="glass-card-secondary p-3 rounded-xl text-center">
                <div className="text-lg font-bold text-purple-600">{stats.totalAura}</div>
                <div className="text-xs text-muted-foreground">Total Aura</div>
              </div>
              <div className="glass-card-secondary p-3 rounded-xl text-center">
                <div className="text-lg font-bold text-orange-600">{stats.pendingPosts}</div>
                <div className="text-xs text-muted-foreground">Pending Posts</div>
              </div>
            </div>

            <div className="glass-card-secondary p-3 rounded-xl">
              <h4 className="font-medium text-sm mb-2">Mood Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">😊 Chill</span>
                  <span className="text-xs">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">💪 Productive</span>
                  <span className="text-xs">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">😤 Cranky</span>
                  <span className="text-xs">25%</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="aura" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Aura Controls</h3>
              <Button size="sm" className="h-8 px-3">
                <Award size={14} className="mr-1" />
                New Badge
              </Button>
            </div>

            <div className="space-y-3">
              <div className="glass-card-secondary p-3 rounded-xl">
                <h4 className="font-medium text-sm mb-2">Quick Rewards</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" className="text-xs">+10 Aura</Button>
                  <Button size="sm" variant="outline" className="text-xs">+25 Aura</Button>
                  <Button size="sm" variant="outline" className="text-xs">+50 Aura</Button>
                </div>
              </div>

              <div className="glass-card-secondary p-3 rounded-xl">
                <h4 className="font-medium text-sm mb-2">Create Challenge</h4>
                <p className="text-xs text-muted-foreground mb-2">Create community challenges for aura rewards</p>
                <Button size="sm" className="w-full text-xs">Create Challenge</Button>
              </div>

              <div className="glass-card-secondary p-3 rounded-xl">
                <h4 className="font-medium text-sm mb-2">Moderation Logs</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• Rewarded @priya_artist +15 aura</div>
                  <div>• Warned @spam_user for inappropriate content</div>
                  <div>• Created "Fitness Challenge" event</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboard;
