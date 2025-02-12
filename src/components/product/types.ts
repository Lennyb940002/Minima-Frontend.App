export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  costPrice: number;
  salePrice: number;
  status: 'draft' | 'in-progress' | 'validated' | 'rejected';
  totalScore: number;
  tags: string[];
  price: number;
  margin: number;
  effect: number;
  problem: number;
  images: number;
  videos: number;
  competition: number;
  season: number;
  link: string;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  initialData?: Partial<Product>;
}

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  costPrice: number;
  salePrice: number;
}