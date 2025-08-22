export interface Category {
    id: string;
    name: string;
    slug:string;
    assets: {
      source: string;
    };
  }
  

  
  export interface Product {
    featuredAsset: {
      source: string;
    };
    description: string;
    variants: {
      priceWithTax: number;
      stockLevel: number;
      sku: string;
    }
  }
  
  export interface ProductCard {
    featuredAsset: {
      source: string;
    };
    description: string;
    variants: {
      stockLevel: number;
      sku: string;
    }
  }
  
  export interface ProductVariant { 
    id: string;
    name: string;
    priceWithTax: number;
    product: {
      featuredAsset: {
        source: string;
      };
      description: string;
      variants: {
        stockLevel: string;
        sku: string;
      }[];
    };
  }
  
  export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber?: string | null;
  }
  
  export interface OrderLine {
    __typename?: "OrderLine" | undefined;
    id: string;
    unitPrice: number;
    quantity: number;
    featuredAsset?: {
      __typename?: "Asset" | undefined;
      source: string;
    } | null | undefined;
    productVariant: {
      name: string;
      priceWithTax?: number | undefined;
    };
    proratedUnitPriceWithTax: number;
    discounts: {
      amountWithTax: number;
    }[];
  }
  
  export interface Address {
    id: number;
    fullName: string;
    company: string;
    streetLine1: string;
    city: string;
    province: string;
    postalCode: string;
    country: {
      name: string;
      code: string;
    };
    phoneNumber: string;
  }
  
  export interface ShippingMethod {
    id: string;
    name: string;
    price: number;
  }

  export interface Order {
    id?: string;
    totalWithTax: number;
    total: number;
    lines: OrderLine[];
    shippingAddress?: Address;
    shippingMethod?: ShippingMethod;
    state?: string;
  }


  // store interfaces
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    product:Product;
  };
  
  export interface User {
    id: string;
    customer:Customer
  };

  export interface StoreState  {
    // Auth
    isLoggedIn: boolean;
    user: User | null;
    setIsLoggedIn : (loggedIn:boolean) => void;
    login: (user: User) => void;
    logout: () => void;
  
    // Cart
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
  };