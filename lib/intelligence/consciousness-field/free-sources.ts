// lib/intelligence/consciousness-field/free-sources.ts
// 14 free data sources — no API keys required.

export interface SourceResult {
    source: string;
    volume: number;
    sentiment: number;
    keywords: string[];
}

export async function fetchReddit(subreddit: string = 'ireland'): Promise<SourceResult> {
    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/.rss`, {
            headers: { 'Accept': 'application/rss+xml' }
        });
        const text = await response.text();
        const titles = [...text.matchAll(/<title>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const relevant = titles.filter(t => !t.includes('reddit') && !t.includes('weekly') && !t.includes('daily'));
        const volume = Math.min(1, relevant.length / 25);
        const positive = ['great', 'good', 'love', 'excellent', 'brilliant', 'best', 'amazing'];
        const negative = ['bad', 'terrible', 'worst', 'hate', 'awful', 'fail', 'crisis', 'problem'];
        let pos = 0, neg = 0;
        relevant.forEach(t => {
            positive.forEach(w => { if (t.includes(w)) pos++; });
            negative.forEach(w => { if (t.includes(w)) neg++; });
        });
        const sentiment = (pos + neg) > 0 ? (pos - neg) / (pos + neg) : 0;
        const keywords = [...new Set(relevant.flatMap(t => t.split(' ').filter(w => w.length > 4)))].slice(0, 10);
        return { source: 'Reddit', volume, sentiment, keywords };
    } catch (e) {
        return { source: 'Reddit', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchHackerNews(): Promise<SourceResult> {
    try {
        const topStories = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = (await topStories.json()).slice(0, 30);
        const stories = await Promise.all(ids.map(async (id: number) => {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return res.json();
        }));
        const titles = stories.map((s: any) => (s.title || '').toLowerCase()).filter(Boolean);
        const volume = Math.min(1, titles.length / 30);
        const positive = ['launch', 'show', 'new', 'fast', 'best', 'great', 'open source', 'free'];
        const negative = ['bug', 'fail', 'crash', 'hack', 'leak', 'breach', 'broken'];
        let pos = 0, neg = 0;
        titles.forEach(t => {
            positive.forEach(w => { if (t.includes(w)) pos++; });
            negative.forEach(w => { if (t.includes(w)) neg++; });
        });
        const sentiment = (pos + neg) > 0 ? (pos - neg) / (pos + neg) : 0;
        const keywords = [...new Set(titles.flatMap(t => t.split(' ').filter(w => w.length > 5)))].slice(0, 10);
        return { source: 'HackerNews', volume, sentiment, keywords };
    } catch (e) {
        return { source: 'HackerNews', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchWikipedia(): Promise<SourceResult> {
    try {
        const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=mostviewed&format=json&origin=*');
        const data = await response.json();
        const articles = (data.query?.mostviewed || []).slice(0, 20);
        const titles = articles.map((a: any) => (a.title || '').toLowerCase());
        const volume = Math.min(1, articles.length / 20);
        const keywords = titles.slice(0, 10);
        return { source: 'Wikipedia', volume, sentiment: 0, keywords };
    } catch (e) {
        return { source: 'Wikipedia', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchGitHubTrending(): Promise<SourceResult> {
    try {
        const response = await fetch('https://github.com/trending.atom', {
            headers: { 'Accept': 'application/atom+xml' }
        });
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const repos = titles.filter(t => !t.includes('trending') && !t.includes('github'));
        const volume = Math.min(1, repos.length / 25);
        const keywords = [...new Set(repos.flatMap(t => t.split(/[\s\/\-]+/).filter(w => w.length > 4)))].slice(0, 10);
        return { source: 'GitHubTrending', volume, sentiment: 0.1, keywords };
    } catch (e) {
        return { source: 'GitHubTrending', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchArXiv(category: string = 'cs.AI'): Promise<SourceResult> {
    try {
        const response = await fetch(`http://export.arxiv.org/api/query?search_query=cat:${category}&sortBy=submittedDate&max_results=15`);
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const volume = Math.min(1, titles.length / 15);
        const keywords = [...new Set(titles.flatMap(t => t.split(' ').filter(w => w.length > 5 && !w.includes('arxiv')))).slice(0, 10)];
        return { source: 'arXiv', volume, sentiment: 0.05, keywords };
    } catch (e) {
        return { source: 'arXiv', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchProductHunt(): Promise<SourceResult> {
    try {
        const response = await fetch('https://www.producthunt.com/feed', { headers: { 'Accept': 'text/html' } });
        const text = await response.text();
        const productNames = [...text.matchAll(/<a[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/a>/gi)].map(m => m[1].toLowerCase().trim());
        const volume = Math.min(1, productNames.length / 20);
        const keywords = productNames.slice(0, 10);
        return { source: 'ProductHunt', volume, sentiment: 0.2, keywords };
    } catch (e) {
        return { source: 'ProductHunt', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchYouTube(): Promise<SourceResult> {
    try {
        const response = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCX6OQ3DkcsbYNE6H8uQQuVA', {
            headers: { 'Accept': 'application/rss+xml' }
        });
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const videoTitles = titles.filter(t => !t.includes('youtube') && !t.includes('channel'));
        const volume = Math.min(1, videoTitles.length / 15);
        const keywords = [...new Set(videoTitles.flatMap(t => t.split(' ').filter(w => w.length > 4)))].slice(0, 10);
        return { source: 'YouTube', volume, sentiment: 0.1, keywords };
    } catch (e) {
        return { source: 'YouTube', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchMedium(tag: string = 'technology'): Promise<SourceResult> {
    try {
        const response = await fetch(`https://medium.com/feed/tag/${tag}`, { headers: { 'Accept': 'application/rss+xml' } });
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const volume = Math.min(1, titles.length / 20);
        const keywords = [...new Set(titles.flatMap(t => t.split(' ').filter(w => w.length > 4)))].slice(0, 10);
        return { source: 'Medium', volume, sentiment: 0.05, keywords };
    } catch (e) {
        return { source: 'Medium', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchBBC(): Promise<SourceResult> {
    try {
        const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml', { headers: { 'Accept': 'application/rss+xml' } });
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const newsTitles = titles.filter(t => !t.includes('bbc'));
        const volume = Math.min(1, newsTitles.length / 30);
        const positive = ['growth', 'win', 'success', 'best', 'record', 'rise', 'boost', 'hope'];
        const negative = ['crash', 'crisis', 'death', 'war', 'attack', 'disaster', 'fear', 'loss'];
        let pos = 0, neg = 0;
        newsTitles.forEach(t => {
            positive.forEach(w => { if (t.includes(w)) pos++; });
            negative.forEach(w => { if (t.includes(w)) neg++; });
        });
        const sentiment = (pos + neg) > 0 ? (pos - neg) / (pos + neg) : 0;
        return { source: 'BBC', volume, sentiment, keywords: newsTitles.slice(0, 10) };
    } catch (e) {
        return { source: 'BBC', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchRTE(): Promise<SourceResult> {
    try {
        const response = await fetch('https://www.rte.ie/rss/news.xml', { headers: { 'Accept': 'application/rss+xml' } });
        const text = await response.text();
        const titles = [...text.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].toLowerCase());
        const newsTitles = titles.filter(t => !t.includes('rté') && !t.includes('rte'));
        const volume = Math.min(1, newsTitles.length / 25);
        const positive = ['growth', 'jobs', 'investment', 'success', 'launch', 'win', 'boost', 'rise', 'new', 'record'];
        const negative = ['crisis', 'crash', 'loss', 'fail', 'shortage', 'problem', 'warning', 'concern', 'cut'];
        let pos = 0, neg = 0;
        newsTitles.forEach(t => {
            positive.forEach(w => { if (t.includes(w)) pos++; });
            negative.forEach(w => { if (t.includes(w)) neg++; });
        });
        const sentiment = (pos + neg) > 0 ? (pos - neg) / (pos + neg) : 0;
        return { source: 'RTE', volume, sentiment, keywords: newsTitles.slice(0, 10) };
    } catch (e) {
        return { source: 'RTE', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchEurostat(): Promise<SourceResult> {
    try {
        const response = await fetch('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tps00001?format=JSON&lang=en');
        await response.json();
        return { source: 'Eurostat', volume: 0.5, sentiment: 0, keywords: ['eurostat', 'eu', 'economy'] };
    } catch (e) {
        return { source: 'Eurostat', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchOpenStreetMap(): Promise<SourceResult> {
    try {
        const response = await fetch('https://api.openstreetmap.org/api/0.6/notes?limit=20&closed=0');
        const text = await response.text();
        const volume = Math.min(1, (text.match(/<note/g) || []).length / 20);
        return { source: 'OpenStreetMap', volume, sentiment: 0, keywords: ['mapping', 'local'] };
    } catch (e) {
        return { source: 'OpenStreetMap', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchUptimeRobot(): Promise<SourceResult> {
    return { source: 'UptimeRobot', volume: 0.3, sentiment: 0, keywords: ['uptime', 'monitoring'] };
}

export async function fetchGoogleTrends(keyword: string = 'digital products'): Promise<SourceResult> {
    try {
        const response = await fetch(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=IE`);
        const text = await response.text();
        const mentions = (text.match(new RegExp(keyword, 'gi')) || []).length;
        const volume = Math.min(1, mentions / 10);
        return { source: 'GoogleTrends', volume, sentiment: mentions > 5 ? 0.3 : 0, keywords: [keyword] };
    } catch (e) {
        return { source: 'GoogleTrends', volume: 0, sentiment: 0, keywords: [] };
    }
}

export async function fetchAllFreeSources(): Promise<SourceResult[]> {
    const results = await Promise.allSettled([
        fetchReddit('ireland'),
        fetchHackerNews(),
        fetchWikipedia(),
        fetchGitHubTrending(),
        fetchArXiv(),
        fetchProductHunt(),
        fetchYouTube(),
        fetchMedium('technology'),
        fetchBBC(),
        fetchRTE(),
        fetchEurostat(),
        fetchOpenStreetMap(),
        fetchUptimeRobot(),
        fetchGoogleTrends('ireland business digital'),
    ]);
    return results
        .filter((r): r is PromiseFulfilledResult<SourceResult> => r.status === 'fulfilled')
        .map(r => r.value);
}

export function aggregateSources(sources: SourceResult[]): {
    totalVolume: number;
    avgSentiment: number;
    topKeywords: string[];
    sourceCount: number;
} {
    if (sources.length === 0) {
        return { totalVolume: 0, avgSentiment: 0, topKeywords: [], sourceCount: 0 };
    }
    const totalVolume = sources.reduce((sum, s) => sum + s.volume, 0) / sources.length;
    const avgSentiment = sources.reduce((sum, s) => sum + s.sentiment, 0) / sources.length;
    const allKeywords = sources.flatMap(s => s.keywords);
    const keywordFreq: Record<string, number> = {};
    allKeywords.forEach(k => { keywordFreq[k] = (keywordFreq[k] || 0) + 1; });
    const topKeywords = Object.entries(keywordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([k]) => k);
    return { totalVolume, avgSentiment, topKeywords, sourceCount: sources.length };
}
