export interface Criterion {
  title: string;
  emoji: string;
  maxScore: number;
  description: string;
  points?: string[];
}

export interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: any) => void;
  initialData?: Partial<any>;
}

export interface ProductFormData {
  name: string;
  type: string;
  script?: string;
  hashtags: string;
  isAd: boolean;
  adBudget?: number;
  adDuration?: string;
  postDate?: string;
  postTime?: string;
  platform: string;
  content?: string;
  objective?: string;
}