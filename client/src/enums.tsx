export enum Order {
  priceASC = 'price%ASC',
  priceDESC = 'price%DESC',
  stock = 'stock',
  news = 'news',
}

export enum Enum_PurchaseStatus {
  PENDING_PAYMENT_METHOD = 'PENDING_PAYMENT_METHOD',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PURCHASE = 'PURCHASE',
  CANCELLED = 'CANCELLED',
}

export enum Enum_PaymentType {
  LIBSCREDITS = 'LIBSCREDITS',
  //paypal, strapi, etc
}

export enum Enum_TotalPriceFilter {
  '1-10',
  '11-25',
  '26-50',
  '51-100',
  '101-100000',
  'all',
}

export enum Role_Enum {
  SELLER = 'seller',
  USER = 'user',
  ADMIN = 'admin',
}
