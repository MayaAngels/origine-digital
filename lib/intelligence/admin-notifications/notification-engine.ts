// lib/intelligence/admin-notifications/notification-engine.ts
// 24-hour admin notification window with 3 reminders.

interface Notification {
    id: string;
    decisionId: string;
    productTitle: string;
    hour: number;        // 0, 8, 16, or 24
    message: string;
    sent: boolean;
    sentAt?: string;
}

export class NotificationEngine {
    private notifications: Notification[] = [];

    scheduleNotifications(decisionId: string, productTitle: string): void {
        const messages = [
            { hour: 0, message: `🔔 New product ready for review: "${productTitle}"` },
            { hour: 8, message: `⏰ Reminder: "${productTitle}" still waiting for your review` },
            { hour: 16, message: `⚠️ Final notice: "${productTitle}" will auto-publish in 8 hours` },
            { hour: 24, message: `🚀 AUTO-PUBLISHED: "${productTitle}" is now live` },
        ];

        messages.forEach(m => {
            this.notifications.push({
                id: `notif_${Date.now()}_${m.hour}`,
                decisionId,
                productTitle,
                hour: m.hour,
                message: m.message,
                sent: false,
            });
        });
    }

    getPendingNotifications(hoursElapsed: number): Notification[] {
        return this.notifications.filter(n => !n.sent && n.hour <= hoursElapsed);
    }

    markAsSent(notificationId: string): void {
        const n = this.notifications.find(x => x.id === notificationId);
        if (n) { n.sent = true; n.sentAt = new Date().toISOString(); }
    }

    getNotificationHistory(): Notification[] {
        return this.notifications.filter(n => n.sent).sort((a, b) => (b.sentAt || '').localeCompare(a.sentAt || ''));
    }
}
