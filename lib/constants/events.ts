export const EVENT_NAMES = {
  PRODUCT_VIEWED: "product_viewed",
  PRODUCT_ADDED_TO_CART: "product_added_to_cart",
  PRODUCT_REMOVED_FROM_CART: "product_removed_from_cart",
  PRODUCT_PURCHASED: "product_purchased",

  SERVICE_VIEWED: "service_viewed",
  SERVICE_CTA_CLICKED: "service_cta_clicked",
  SERVICE_REQUEST_STARTED: "service_request_started",
  SERVICE_REQUEST_SUBMITTED: "service_request_submitted",

  DONE_FOR_YOU_PAGE_VIEWED: "done_for_you_page_viewed",
  DONE_FOR_YOU_FORM_STARTED: "done_for_you_form_started",
  DONE_FOR_YOU_SUBMITTED: "done_for_you_submitted",

  CART_VIEWED: "cart_viewed",
  CHECKOUT_STARTED: "checkout_started",
  CHECKOUT_COMPLETED: "checkout_completed",

  ACCOUNT_CREATED: "account_created",
  LOGIN: "login",
  DASHBOARD_ACCESSED: "dashboard_accessed",
} as const;