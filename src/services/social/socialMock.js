// src/services/social/socialMock.js
export function createSocialPost(platform, content) {
    return {
        id: post- + platform + - + Date.now(),
        platform,
        content,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };
}
export async function publishSocialPost(post) {
    console.log([SOCIAL MOCK] Publicando no  + post.platform + :  + post.content.slice(0, 30) + ...);
    post.status = 'published';
    post.engagement = { likes: Math.floor(Math.random()*100), shares: Math.floor(Math.random()*20) };
    return { success: true, post };
}
