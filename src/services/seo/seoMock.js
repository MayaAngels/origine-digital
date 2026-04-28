// src/services/seo/seoMock.js
export function generateSEOBlogPost(topic) {
    return {
        id: log- + Date.now(),
        title: How AI is Transforming  + topic,
        content: ... (simulated content for  + topic + ) ...,
        seoScore: 85 + Math.floor(Math.random() * 15),
        trafficPotential: Math.floor(Math.random() * 500) + 200,
        createdAt: new Date().toISOString()
    };
}
export async function simulateOrganicTraffic(postId) {
    const sessions = Math.floor(Math.random() * 300) + 100;
    const conversions = Math.floor(sessions * 0.08);
    const revenue = conversions * 29.99;
    console.log([SEO MOCK] Tráfego orgânico para  + postId + :  + sessions +  sessões);
    return { postId, sessions, conversions, revenue: parseFloat(revenue.toFixed(2)) };
}
