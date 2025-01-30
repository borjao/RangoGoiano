export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'jantinha' | 'espetos' | 'hamburgers' | 'bebidas';
  isPromo?: boolean;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address?: Address;
  paymentMethod: 'credit' | 'cash' | 'pix';
  orderDetails?: string;
}

export interface DailyPromotion {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  isPromo: true;
}