
import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityHomeView from '../components/CommunityHomeView';

const CommunityPage = () => {
  const { id } = useParams();

  // Mock community data
  const community = {
    id: id || '1',
    name: 'Bidholi Fitness',
    description: 'Join us for fitness activities and healthy living in the Bidholi area!',
    tagline: 'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
    members: 320,
    mood: 'productive',
    location: 'Dehradun, Uttarakhand',
    banner: '/api/placeholder/400/160',
    icon: '/api/placeholder/64/64',
    isLocal: true,
    userRole: 'creator' as const
  };

  const topMembers = [
    {
      id: '1',
      name: 'rahul_dev',
      avatar: '/api/placeholder/48/48',
      aura: 1250,
      role: 'creator' as const,
      joinedDate: '2024-01-15',
      isVerified: true,
      lastActive: '2m ago'
    },
    {
      id: '2',
      name: 'priya_artist',
      avatar: '/api/placeholder/48/48',
      aura: 850,
      role: 'moderator' as const,
      joinedDate: '2024-02-01',
      isVerified: true,
      lastActive: '1h ago'
    },
    {
      id: '3',
      name: 'fitness_guru',
      avatar: '/api/placeholder/48/48',
      aura: 720,
      role: 'member' as const,
      joinedDate: '2024-02-10',
      isVerified: true,
      lastActive: '3h ago'
    }
  ];

  const subCommunities = [
    {
      id: 'shiv-gym',
      name: 'Shiv Gym',
      emoji: '💪',
      description: 'Heavy lifting and strength training',
      members: 120,
      posts: [
        {
          id: '1',
          content: 'New deadlift PR today! 💪',
          author: 'strong_sam',
          timeAgo: '2h ago'
        }
      ]
    },
    {
      id: 'yoga-vibes',
      name: 'Yoga Vibes',
      emoji: '🧘',
      description: 'Mindful movement and meditation',
      members: 65,
      posts: [
        {
          id: '1',
          content: 'Morning session was so peaceful today 🧘‍♀️',
          author: 'zen_master',
          timeAgo: '4h ago'
        }
      ]
    },
    {
      id: 'zumba-girls',
      name: 'Zumba Girls',
      emoji: '💃',
      description: 'Dance fitness and fun',
      members: 40,
      posts: [
        {
          id: '1',
          content: 'Tonight\'s class is going to be 🔥',
          author: 'dance_queen',
          timeAgo: '1h ago'
        }
      ]
    }
  ];

  return (
    <CommunityHomeView
      community={community}
      topMembers={topMembers}
      subCommunities={subCommunities}
    />
  );
};

export default CommunityPage;
