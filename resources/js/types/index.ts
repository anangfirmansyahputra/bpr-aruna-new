import { LucideIcon } from 'lucide-react';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface NavGroupItem {
  group: string;
  icon: LucideIcon;
  children: NavItem[];
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface InputName<T> {
  type: 'text' | 'select' | 'textarea' | 'file' | 'toggle' | 'rich editor';
  name: T;
  placeholder?: string;
  label: string;
  options?: Record<string, string>[];
  description?: string;
  required?: boolean;
  helperText?: string;
  col?: number;
  disabled?: boolean;
  accept?: string;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  image_url: string;
  is_credit: boolean;
  calculator_name: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  keywords: string[];
  meta_description: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: number;
  title: string;
  file: string;
  created_at: string;
  updated_at: string;
}
