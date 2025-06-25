
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Plus, MapPin, Crown, Settings } from 'lucide-react';
import SubCommunityTabs from './SubCommunityTabs';
import AdminDashboard from './AdminDashboard';
import CommunitySettings from './CommunitySettings';

interface Community {
  id: string;
  name: string;
  description: string;
  tagline: string;
  members: number;
  mood: string;
  location: string | null;
  banner: string;
  icon: string;
  isLocal: boolean;
  userRole: 'creator' | 'moderator' | 'member' | 'guest';
}

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

interface CommunityHomeViewProps {
  community: Community;
  topMembers: Member[];
  subCommunities: any[];
}

const CommunityHomeView = ({ community, topMembers, subCommunities }: CommunityHomeViewProps) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [hasJoined, setHasJoined] = useState(community.userRole !== 'guest');

  const handleJoinCommunity = () => {
    setHasJoined(true);
    console.log('Joining community:', community.id);
  };

  const canCreateSubCommunity = community.userRole === 'creator' || community.userRole === 'moderator';
  const canAccessSettings = community.userRole === 'creator' || community.userRole === 'moderator';

  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'rahul_dev',
      avatar: '/api/placeholder/32/32',
      aura: 1250,
      role: 'creator',
      joinedDate: '2024-01-15',
      isVerified: true,
      lastActive: '2m ago'
    },
    {
      id: '2',
      name: 'priya_artist',
      avatar: '/api/placeholder/32/32',
      aura: 850,
      role: 'moderator',
      joinedDate: '2024-02-01',
      isVerified: true,
      lastActive: '1h ago'
    }
  ];

  const mockPosts = [
    {
      id: '1',
      content: 'Great workout session today! Who else is hitting the gym?',
      author: 'fitness_guru',
      status: 'pending' as const,
      reports: 0,
      aura: 25
    }
  ];

  return (
    <div className="space-y-4 animate-glass-fade-in">
      {/* Community Header */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <img
            src={community.banner}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Community Icon */}
          <div className="absolute bottom-4 left-4">
            <img
              src={community.icon}
              alt={community.name}
              className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg"
            />
          </div>

          {/* Settings Button */}
          {canAccessSettings && (
            <div className="absolute top-4 right-4">
              <CommunitySettings communityName={community.name}>
                <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
                  <Settings size={16} className="text-white" />
                </button>
              </CommunitySettings>
            </div>
          )}

          {/* Mood Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge className={`mood-badge bg-mood-${community.mood} text-white`}>
              {community.mood}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{community.name}</h1>
                {community.userRole === 'creator' && (
                  <Crown size={16} className="text-yellow-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{community.tagline}</p>
              <p className="text-sm">{community.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{community.members} members</span>
              </div>
              {community.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{community.location}</span>
                </div>
              )}
            </div>

            {!hasJoined ? (
              <Button onClick={handleJoinCommunity} className="px-6">
                Join Community
              </Button>
            ) : (
              <Badge variant="secondary" className="px-3 py-1">
                Joined
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Top Members Carousel */}
      {hasJoined && (
        <div className="glass-card rounded-2xl p-4">
          <h3 className="font-semibold text-sm mb-3">Top Contributors</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {topMembers.map((member) => (
              <div key={member.id} className="flex-shrink-0 text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full mb-2"
                />
                <div className="text-xs font-medium">{member.name}</div>
                <div className="text-xs text-purple-600">{member.aura} aura</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Tabs */}
      {hasJoined && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 glass-card-secondary">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="subclubs">Sub-clubs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4 mt-4">
            <div className="glass-card rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Recent Posts</h3>
              <div className="space-y-3">
                <div className="glass-card-secondary p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">@fitness_guru</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-sm">Just crushed my morning workout! 💪 Who's joining me for the evening session?</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Members ({community.members})</h3>
              {canAccessSettings && (
                <AdminDashboard
                  communityName={community.name}
                  userRole={community.userRole as 'creator' | 'moderator'}
                  members={mockMembers}
                  posts={mockPosts}
                >
                  <Button size="sm" variant="outline" className="glass-card border-0">
                    <Crown size={14} className="mr-1" />
                    Admin Panel
                  </Button>
                </AdminDashboard>
              )}
            </div>
            
            <div className="space-y-2">
              {mockMembers.map((member) => (
                <div key={member.id} className="glass-card-secondary p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{member.name}</span>
                        {member.role === 'creator' && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-700">
                            <Crown size={10} className="mr-1" />
                            Creator
                          </Badge>
                        )}
                        {member.role === 'moderator' && (
                          <Badge className="text-xs bg-blue-100 text-blue-700">
                            Mod
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.aura} aura • Active {member.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subclubs" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sub-clubs</h3>
              {canCreateSubCommunity && (
                <Button size="sm" className="glass-card">
                  <Plus size={14} className="mr-1" />
                  Create Sub-club
                </Button>
              )}
            </div>
            
            {subCommunities.length > 0 ? (
              <SubCommunityTabs
                communityName={community.name}
                subCommunities={subCommunities}
              />
            ) : (
              <div className="glass-card-secondary p-6 rounded-2xl text-center">
                <p className="text-sm text-muted-foreground">No sub-clubs yet</p>
                {canCreateSubCommunity && (
                  <Button size="sm" className="mt-3">
                    Create First Sub-club
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Upcoming Events</h3>
              {canCreateSubCommunity && (
                <Button size="sm" className="glass-card">
                  <Calendar size={14} className="mr-1" />
                  Create Event
                </Button>
              )}
            </div>
            
            <div className="glass-card-secondary p-6 rounded-2xl text-center">
              <Calendar size={32} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No events scheduled</p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CommunityHomeView;
