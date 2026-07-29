export type ProjectCategory =
  | 'Platform'
  | 'Web App'
  | 'School'
  | 'Side Quests';

export type ProjectItem = {
  number: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  imageUrl: string;
  imagePosition: string;
};

export const projectFilters = [
  'All',
  'Platform',
  'Web App',
  'School',
  'Side Quests',
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projectPageData: ProjectItem[] = [
  {
    number: '01',
    title: 'Darwin\'s Hardware',
    category: 'School',
    tags: ['PHP', 'MySQL', 'Inventory Management'],
    imageUrl: '/pics/darwins.jpg',
    imagePosition: 'center',
  },
  {
    number: '02',
    title: 'Compo',
    category: 'Web App',
    tags: ['React', 'TypeScript', 'Supabase','PWA', 'Digital Workspace'],
    imageUrl: '/pics/compo.png',
    imagePosition: 'left center',
  },
  {
    number: '03',
    title: 'Credibly',
    category: 'Web App',
    tags: ['React', 'TypeScript', 'MongoDB', 'Learning Platform'],
    imageUrl: '/pics/credibly.png',
    imagePosition: '70% center',
  },
  {
    number: '04',
    title: 'Manic Emulator Skins',
    category: 'Side Quests',
    tags: ['Emulator', 'Design'],
    imageUrl: '/pics/emulator.png',
    imagePosition: 'center center',
  },
];
