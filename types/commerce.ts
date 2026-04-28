export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type ServiceStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type DeliveryType = "INSTANT" | "MANUAL" | "HYBRID";
export type ServiceDeliveryType = "REQUEST" | "BOOKING" | "PURCHASE";

export type OrderStatus = "PENDING" | "PAID" | "FULFILLING" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type FulfillmentStatus = "PENDING" | "READY" | "DELIVERED" | "IN_PROGRESS" | "COMPLETED";

export type CartItemType = "PRODUCT" | "SERVICE";

export interface ProductSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  price: number;
  status: ProductStatus;
  featured: boolean;
  categorySlug?: string | null;
  thumbnailUrl?: string | null;
}

export interface ServiceSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  startingPrice: number;
  status: ServiceStatus;
  featured: boolean;
  categorySlug?: string | null;
}

export interface CartLine {
  id: string;
  itemType: CartItemType;
  productId?: string | null;
  serviceId?: string | null;
  quantity: number;
  unitPrice: number;
}