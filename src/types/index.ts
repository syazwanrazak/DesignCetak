export interface ProductOption {
  label: string;
  choices: string[];
  choiceImages?: Record<string, string>;
}

export interface Product {
  id: number;
  order?: number;
  name: string;
  category: string;
  desc: string;
  fullDesc: string;
  icon: string;
  color: string;
  bg: string;
  price: string;
  featured: boolean;
  image?: string | null;
  options: ProductOption[];
}

export interface OrderFormValues {
  name: string;
  phone: string;
  quantity: string;
  notes: string;
}

export interface SelectedOptions {
  [optionLabel: string]: string;
}
