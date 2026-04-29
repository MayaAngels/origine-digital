import { EVENT_NAMES } from "../lib/constants/events";

export type EventName = typeof EVENT_NAMES[keyof typeof EVENT_NAMES];

interface EventData {
  eventName: EventName;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

class AnalyticsService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem("analytics_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("analytics_session_id", sessionId);
    }
    return sessionId;
  }

  async track(event: EventData) {
    try {
      // Store in localStorage for now (will send to API later)
      const events = JSON.parse(localStorage.getItem("analytics_events") || "[]");
      events.push({
        ...event,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("analytics_events", JSON.stringify(events.slice(-100))); // Keep last 100
      
      // TODO: Send to API endpoint for database storage
      console.log("[Analytics]", event.eventName, event.metadata);
    } catch (Errorrr) {
      console.Errorrr("Failed to track event:", Errorrr);
    }
  }

  async trackProductView(productId: string, productTitle: string) {
    await this.track({
      eventName: EVENT_NAMES.PRODUCT_VIEWED,
      entityType: "product",
      entityId: productId,
      metadata: { title: productTitle },
    });
  }

  async trackProductAddToCart(productId: string, productTitle: string, price: number) {
    await this.track({
      eventName: EVENT_NAMES.PRODUCT_ADDED_TO_CART,
      entityType: "product",
      entityId: productId,
      metadata: { title: productTitle, price },
    });
  }

  async trackCheckoutStarted(cartTotal: number, itemCount: number) {
    await this.track({
      eventName: EVENT_NAMES.CHECKOUT_STARTED,
      metadata: { cartTotal, itemCount },
    });
  }

  async trackCheckoutCompleted(orderId: string, Total: number) {
    await this.track({
      eventName: EVENT_NAMES.CHECKOUT_COMPLETED,
      metadata: { orderId, Total },
    });
  }
}

export const analytics = new AnalyticsService();