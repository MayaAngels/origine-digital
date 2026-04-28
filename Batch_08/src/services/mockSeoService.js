// src/services/mockSeoService.js
export async function generateKeywords(topic) {
  return {
    keywords: [`best ${topic}`, `${topic} online`, `buy ${topic}`, `${topic} 2026`, `cheap ${topic}`],
    longTail: [`how to use ${topic} effectively`, `${topic} for beginners`, `top ${topic} tools`],
    difficulty: 'low',
    searchVolume: 1200
  };
}

export async function optimizeContent(content, keywords) {
  return {
    optimized: `[SEO optimized] ${content}`,
    keywordDensity: { primary: 2.5, secondary: 1.8 },
    readabilityScore: 85,
    metaTitle: `Ultimate Guide to ${keywords[0]}`,
    metaDescription: `Learn everything about ${keywords[0]}. Updated for 2026.`
  };
}
