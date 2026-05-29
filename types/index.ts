export interface MenuItem {
  name: string;
  price: number;
  calories: number;
  sizes?: { size: string; price: number; calories: number }[];
  includes?: string[];
  needsCustomization?: boolean;
}

export interface OrderItem {
  name: string;
  price: number;
  calories: number;
  quantity: number;
  category: string;
  size?: string;
  needsCustomization?: boolean;
  includes?: string[];
  customizations?: Record<string, string>;
  specialNotes?: string;
  happyMealCustomizations?: Record<string, string>;
  burgerCustomizations?: Record<string, string>;
}

export interface Condiment {
  name: string;
  quantity: number;
  calories: number;
}

export interface User {
  username: string;
  avatar: string;
  theme: string;
  displayName: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type StepName = 'order-name' | 'order-items' | 'condiments' | 'pickup' | 'payment' | 'review' | 'confirmation';
