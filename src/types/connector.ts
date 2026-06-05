export type ConnectorVisibility = 'public' | 'family' | 'owner';

export interface Connector {
  id: string;
  title: string;
  content: string;
  videoUrl?: string; // YouTube/TikTok embed URL
  tags: string[];
  visibility: ConnectorVisibility;
  createdAt: any;
  updatedAt: any;
}
