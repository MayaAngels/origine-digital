// lib/intelligence/consciousness-field/field-manager.ts
// v3 — Uses TWITTER_BEARER_TOKEN and NEWS_API_KEY from Netlify environment

interface ConsciousnessState {
    globalAwareness: number;
    marketSentiment: number;
    enlightenmentEvents: number;
    lastUpdated: string;
    sources: {
        twitter?: { volume: number; sentiment: number };
        news?: { volume: number; sentiment: number };
        trends?: { volume: number; sentiment: number };
    };
}

export class ConsciousnessField {
    private state: ConsciousnessState = {
        globalAwareness: 0.5,
        marketSentiment: 0,
        enlightenmentEvents: 0,
        lastUpdated: new Date().toISOString(),
        sources: {}
    };

    async fetchTwitterSentiment(keyword: string = 'ireland business'): Promise<{volume: number; sentiment: number}> {
        const bearerToken = process.env.TWITTER_BEARER_TOKEN;
        if (!bearerToken) {
            console.warn('[Consciousness] No TWITTER_BEARER_TOKEN set');
            return { volume: 0, sentiment: 0 };
        }
        try {
            const response = await fetch(
                `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(keyword)}&max_results=10&tweet.fields=lang`,
                { headers: { Authorization: `Bearer ${bearerToken}` } }
            );
            if (!response.ok) return { volume: 0, sentiment: 0 };
            const data = await response.json();
            const tweets = data.data || [];
            const volume = Math.min(1, tweets.length / 10);
            const positive = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch', 'new', 'best', 'great'];
            const negative = ['crash', 'loss', 'fail', 'crisis', 'problem', 'bad', 'worst', 'terrible'];
            let pos = 0, neg = 0;
            tweets.forEach((t: any) => {
                const text = (t.text || '').toLowerCase();
                positive.forEach(w => { if (text.includes(w)) pos++; });
                negative.forEach(w => { if (text.includes(w)) neg++; });
            });
            const sentiment = (pos + neg) > 0 ? (pos - neg) / (pos + neg) : 0;
            return { volume, sentiment };
        } catch (e) {
            return { volume: 0, sentiment: 0 };
        }
    }

    async fetchNews(keyword: string = 'ireland business technology'): Promise<{volume: number; sentiment: number}> {
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey || apiKey === 'demo') {
            console.warn('[Consciousness] No NEWS_API_KEY set');
            return { volume: 0, sentiment: 0 };
        }
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
            );
            if (!response.ok) return { volume: 0, sentiment: 0 };
            const data = await response.json();
            const articles = data.articles || [];
            const volume = Math.min(1, articles.length / 10);
            const posWords = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch'];
            const negWords = ['crash', 'loss', 'fail', 'crisis', 'problem', 'decline'];
            let pos = 0, neg = 0;
            articles.forEach((a: any) => {
                const text = (a.title + ' ' + (a.description || '')).toLowerCase();
                posWords.forEach(w => { if (text.includes(w)) pos++; });
                negWords.forEach(w => { if (text.includes(w)) neg++; });
            });
            const total = pos + neg;
            const sentiment = total > 0 ? (pos - neg) / total : 0;
            return { volume, sentiment };
        } catch (e) {
            return { volume: 0, sentiment: 0 };
        }
    }

    async fetchGoogleTrends(keyword: string = 'digital products'): Promise<{volume: number; sentiment: number}> {
        try {
            const response = await fetch(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=IE`);
            const text = await response.text();
            const mentions = (text.match(new RegExp(keyword, 'gi')) || []).length;
            return { volume: Math.min(1, mentions / 10), sentiment: mentions > 5 ? 0.3 : 0 };
        } catch (e) {
            return { volume: 0, sentiment: 0 };
        }
    }

    async update(): Promise<ConsciousnessState> {
        const [twitter, news, trends] = await Promise.all([
            this.fetchTwitterSentiment('ireland business digital'),
            this.fetchNews('ireland business technology'),
            this.fetchGoogleTrends('digital products ireland')
        ]);
        
        const totalVolume = (twitter.volume + news.volume + trends.volume) / 3;
        const avgSentiment = (twitter.sentiment + news.sentiment + trends.sentiment) / 3;
        
        this.state.globalAwareness = Math.round((this.state.globalAwareness * 0.85 + totalVolume * 0.15) * 1000) / 1000;
        this.state.marketSentiment = Math.round((this.state.marketSentiment * 0.8 + avgSentiment * 0.2) * 1000) / 1000;
        
        if (totalVolume * Math.abs(avgSentiment) > 0.6) {
            this.state.enlightenmentEvents++;
        }
        
        this.state.sources = {
            twitter: { volume: twitter.volume, sentiment: twitter.sentiment },
            news: { volume: news.volume, sentiment: news.sentiment },
            trends: { volume: trends.volume, sentiment: trends.sentiment }
        };
        this.state.lastUpdated = new Date().toISOString();
        return this.getState();
    }

    getState(): ConsciousnessState {
        return { ...this.state, sources: { ...this.state.sources } };
    }

    getGap(actualRealityCoherence: number): number {
        return Math.abs(this.state.globalAwareness - actualRealityCoherence);
    }
}