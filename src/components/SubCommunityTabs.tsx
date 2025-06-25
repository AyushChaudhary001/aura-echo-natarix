
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SubCommunity {
  id: string;
  name: string;
  emoji: string;
  description: string;
  members: number;
  posts: Array<{
    id: string;
    content: string;
    author: string;
    timeAgo: string;
  }>;
}

interface SubCommunityTabsProps {
  communityName: string;
  subCommunities: SubCommunity[];
}

const SubCommunityTabs = ({ communityName, subCommunities }: SubCommunityTabsProps) => {
  const [activeTab, setActiveTab] = useState(subCommunities[0]?.id || '');

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="font-semibold text-lg mb-4">{communityName} - Sub-clubs</h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 glass-card-secondary">
          {subCommunities.map((subCommunity) => (
            <TabsTrigger
              key={subCommunity.id}
              value={subCommunity.id}
              className="text-xs data-[state=active]:bg-white/70"
            >
              <span className="mr-1">{subCommunity.emoji}</span>
              {subCommunity.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {subCommunities.map((subCommunity) => (
          <TabsContent key={subCommunity.id} value={subCommunity.id} className="mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-sm">{subCommunity.emoji} {subCommunity.name}</h4>
                  <p className="text-xs text-muted-foreground">{subCommunity.description}</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {subCommunity.members} members
                </span>
              </div>

              <div className="space-y-3">
                {subCommunity.posts.map((post) => (
                  <div key={post.id} className="glass-card-secondary p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                    </div>
                    <p className="text-sm">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SubCommunityTabs;
