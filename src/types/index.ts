export interface FolderItem {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  tags?: string[];
  link?: string;
}

export interface PortfolioFolder {
  id: string;
  title: string;
  color: string;
  tabColor: string;
  heading: string;
  subheading?: string;
  details?: string[];
  items?: FolderItem[];
}