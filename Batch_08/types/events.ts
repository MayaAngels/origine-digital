export type EventName =
  | "product_viewed"
  | "product_added_to_cart"
  | "product_removed_from_cart"
  | "product_purchased"
  | "service_viewed"
  | "service_cta_clicked"
  | "service_request_started"
  | "service_request_submitted"
  | "done_for_you_page_viewed"
  | "done_for_you_form_started"
  | "done_for_you_submitted"
  | "cart_viewed"
  | "checkout_started"
  | "checkout_completed"
  | "account_created"
  | "login"
  | "dashboard_accessed";

export interface EventLogInput {
  userId?: string | null;
  sessionId?: string | null;
  eventName: EventName;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}