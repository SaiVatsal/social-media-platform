import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentUser: {
    id: 'user-self',
    name: 'Aria Vance',
    handle: '@ariavance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Digital artist & creative technologist exploring spatial audio and algorithmic visualizers ✨',
    followersCount: 1420,
    followingCount: 388
  },

  stories: [
    {
      id: 'story-1',
      author: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      media: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      caption: 'Generative shader sunset vibes 🌅',
      expiresIn: '18h left',
      viewed: false
    },
    {
      id: 'story-2',
      author: 'Kai Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      media: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      caption: 'Studio session testing analog synths 🎛️',
      expiresIn: '22h left',
      viewed: false
    },
    {
      id: 'story-3',
      author: 'Zara Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      media: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      caption: 'Neo-Tokyo rooftop projection installation',
      expiresIn: '4h left',
      viewed: false
    }
  ],

  posts: [
    {
      id: 'post-1',
      author: {
        name: 'Elena Rostova',
        handle: '@elenarostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      timeAgo: '2h ago',
      content: 'Just launched the new interactive generative art playground. Built with WebGL & real-time audio reactivity! Check out the neon bloom reflections.',
      media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      likes: 128,
      liked: false,
      shares: 34,
      comments: [
        { id: 'c1', user: 'Marcus Vance', text: 'The color grading on this shader is unbelievable!' },
        { id: 'c2', user: 'Chloe Ray', text: 'Bookmarking this right now 🔥' }
      ],
      reported: false
    },
    {
      id: 'post-2',
      author: {
        name: 'Jordan Rivera',
        handle: '@jordan_r',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      },
      timeAgo: '5h ago',
      content: 'Morning espresso and ambient modular patching. There is something serene about polyrhythmic sequences.',
      media: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
      likes: 89,
      liked: true,
      shares: 12,
      comments: [],
      reported: false
    }
  ],

  events: [
    {
      id: 'evt-1',
      title: 'Dystopian Synthwave & Shader Night',
      date: 'Friday, April 10 • 8:00 PM',
      location: 'The Luminary Warehouse, Sector 4',
      rsvps: 240,
      attending: true
    },
    {
      id: 'evt-2',
      title: 'Spatial UI & Creative Coding Meetup',
      date: 'Sunday, April 19 • 3:00 PM',
      location: 'Virtual Reality Auditorium 3',
      rsvps: 115,
      attending: false
    }
  ],

  dms: [
    {
      user: 'Maya Lin',
      handle: '@mayalin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      messages: [
        { from: 'them', text: 'Hey Aria! Did you see the new WebGPU shaders?' },
        { from: 'me', text: 'Yes! The bloom performance is 3x faster on mobile.' }
      ]
    }
  ],

  suggestedFriends: [
    { name: 'Kaelen Vance', handle: '@kaelen_v', mutuals: '8 mutual friends', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Sienna Ross', handle: '@siennaross', mutuals: '14 mutual friends', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' }
  ],

  // Actions
  toggleLike: (postId) => set((state) => ({
    posts: state.posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    })
  })),

  addComment: (postId, commentText) => set((state) => ({
    posts: state.posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            { id: `c-${Date.now()}`, user: state.currentUser.name, text: commentText }
          ]
        };
      }
      return p;
    })
  })),

  sharePost: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, shares: p.shares + 1 } : p
    )
  })),

  createPost: (content, media) => set((state) => ({
    posts: [
      {
        id: `post-${Date.now()}`,
        author: {
          name: state.currentUser.name,
          handle: state.currentUser.handle,
          avatar: state.currentUser.avatar
        },
        timeAgo: 'Just now',
        content,
        media: media || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        likes: 0,
        liked: false,
        shares: 0,
        comments: [],
        reported: false
      },
      ...state.posts
    ]
  })),

  reportPost: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, reported: true } : p
    )
  })),

  toggleEventRsvp: (eventId) => set((state) => ({
    events: state.events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          attending: !e.attending,
          rsvps: e.attending ? e.rsvps - 1 : e.rsvps + 1
        };
      }
      return e;
    })
  })),

  sendDmMessage: (text) => set((state) => {
    const updatedDms = [...state.dms];
    if (updatedDms.length > 0) {
      updatedDms[0].messages.push({ from: 'me', text });
    }
    return { dms: updatedDms };
  }),

  generateAiAvatar: async (name) => {
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(avatars[Math.floor(Math.random() * avatars.length)]);
      }, 800);
    });
  }
}));
