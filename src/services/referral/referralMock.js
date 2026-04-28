// src/services/referral/referralMock.js
export function generateReferralLink(userId) {
    return { link: https://mock.shop/ref?user= + userId, code: 'REF' + Date.now().toString(36) };
}
export async function simulateReferralTraffic(link) {
    const clicks = Math.floor(Math.random() * 200) + 50;
    const conversions = Math.floor(clicks * 0.1);
    const revenue = conversions * 29.99;
    console.log([REFERRAL MOCK] Link teve  + clicks +  cliques,  + conversions +  conversões);
    return { link, clicks, conversions, revenue: parseFloat(revenue.toFixed(2)) };
}
