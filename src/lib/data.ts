
export type Creator = {
  id: string;
  name: string;
  bio: string;
  avatarImageId: string;
};

export type Content = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  type: 'article' | 'photo_essay' | 'video';
  category: 'Fashion' | 'Art' | 'Music';
  creatorId: string;
  imageId: string;
  date: string;
};

export const creators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Elara Vance',
    bio: 'Visual artist and photographer exploring the intersection of nature and urbanism.',
    avatarImageId: 'creator-avatar-1',
  },
  {
    id: 'creator-2',
    name: 'Orion Maxwell',
    bio: 'A musician and writer chronicling the underground music scene and its cultural impact.',
    avatarImageId: 'creator-avatar-2',
  },
  {
    id: 'creator-3',
    name: 'Seraphina Monroe',
    bio: 'Fashion historian and trend analyst with a passion for sustainable and avant-garde design.',
    avatarImageId: 'creator-avatar-3',
  },
];

export const content: Content[] = [
  {
    id: 'content-1',
    slug: 'the-sculpture-of-sound',
    title: 'The Sculpture of Sound',
    excerpt: 'An exploration into how contemporary artists are using sound as a medium for sculpture.',
    type: 'article',
    category: 'Art',
    creatorId: 'creator-1',
    imageId: 'content-art-1',
    date: '2023-10-15',
  },
  {
    id: 'content-2',
    slug: 'future-fabric-sustainable-fashion',
    title: 'Future Fabric: A New Era of Sustainable Fashion',
    excerpt: 'A deep dive into the innovative materials shaping the future of the fashion industry.',
    type: 'article',
    category: 'Fashion',
    creatorId: 'creator-3',
    imageId: 'content-fashion-1',
    date: '2023-11-02',
  },
  {
    id: 'content-3',
    slug: 'concrete-jungle-photo-essay',
    title: 'Concrete Jungle: A Photo Essay',
    excerpt: 'A visual journey through the hidden architectural wonders of major metropolises.',
    type: 'photo_essay',
    category: 'Art',
    creatorId: 'creator-1',
    imageId: 'content-art-2',
    date: '2023-11-20',
  },
  {
    id: 'content-4',
    slug: 'rhythm-of-the-city-video',
    title: 'Rhythm of the City',
    excerpt: 'A short film capturing the vibrant pulse of the underground music scenes across Europe.',
    type: 'video',
    category: 'Music',
    creatorId: 'creator-2',
    imageId: 'content-music-1',
    date: '2023-12-05',
  },
  {
    id: 'content-5',
    slug: 'the-neo-minimalist-movement',
    title: 'The Neo-Minimalist Movement in Fashion',
    excerpt: 'How designers are redefining minimalism with a focus on form, function, and feeling.',
    type: 'photo_essay',
    category: 'Fashion',
    creatorId: 'creator-3',
    imageId: 'content-fashion-2',
    date: '2024-01-10',
  },
  {
    id: 'content-6',
    slug: 'indie-anthems-reimagined',
    title: 'Indie Anthems Reimagined: Acoustic Sessions',
    excerpt: 'A collection of intimate performances from today\'s most exciting indie artists.',
    type: 'video',
    category: 'Music',
    creatorId: 'creator-2',
    imageId: 'content-music-2',
    date: '2024-02-01',
  },
];
