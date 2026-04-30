// lib/intelligence/consciousness-field/field-manager.ts
// v3 — Uses TWITTER_BEARER_TOKEN and NEWS_API_KEY from environment

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

    // Fetch from Twitter/X using Bearer Token
    async fetchTwitterSentiment(keyword: string = 'ireland business'): Promise<{volume: number; sentiment: number}> {
        const bearerToken = process.env.TWITTER_BEARER_TOKEN;
        if (!bearerToken) {
            console.warn('[Consciousness] No TWITTER_BEARER_TOKEN set');
            return { volume: 0, sentiment: 0 };
        }
        try {
            const response = await fetch(
                `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(keyword)}&max_results=20&tweet.fields=lang`,
                { headers: { Authorization: `Bearer ${bearerToken}` } }
            );
            if (!response.ok) return { volume: 0, sentiment: 0 };
            const data = await response.json();
            const tweets = data.data || [];
            const volume = Math.min(1, tweets.length / 20);
            // Simple sentiment: count positive vs negative words
            const positive = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch', 'new', 'best', 'great', 'excellent'];
            const negative = ['crash', 'loss', 'fail', 'crisis', 'problem', 'bad', 'worst', 'terrible', 'bankrupt'];
            let posCount = 0, negCount = 0;
            tweets.forEach((t: any) => {
                const text = (t.text || '').toLowerCase();
                positive.forEach(w => { if (text.includes(w)) posCount++; });
                negative.forEach(w => { if (text.includes(w)) negCount++; });
            });
            const sentiment = (posCount + negCount) > 0 ? (posCount - negCount) / (posCount + negCount) : 0;
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] Twitter fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Fetch from NewsAPI
    async fetchNews(keyword: string = 'ireland business technology'): Promise<{volume: number; sentiment: number}> {
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey || apiKey === 'demo') {
            console.warn('[Consciousness] No NEWS_API_KEY set');
            return { volume: 0, sentiment: 0 };
        }
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
            );
            if (!response.ok) return { volume: 0, sentiment: 0 };
            const data = await response.json();
            const articles = data.articles || [];
            const volume = Math.min(1, articles.length / 20);
            const positiveWords = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch', 'new', 'best', 'great', 'excellent', 'rise', 'gain'];
            const negativeWords = ['crash', 'loss', 'fail', 'crisis', 'problem', 'bad', 'worst', 'terrible', 'bankrupt', 'decline', 'drop'];
            let posCount = 0, negCount = 0;
            articles.forEach((a: any) => {
                const text = (a.title + ' ' + (a.description || '')).toLowerCase();
                positiveWords.forEach(w => { if (text.includes(w)) posCount++; });
                negativeWords.forEach(w => { if (text.includes(w)) negCount++; });
            });
            const total = posCount + negCount;
            const sentiment = total > 0 ? (posCount - negCount) / total : 0;
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] News fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Google Trends RSS (no key needed)
    async fetchGoogleTrends(keyword: string = 'digital products'): Promise<{volume: number; sentiment: number}> {
        try {
            const response = await fetch(
                `https://trends.google.com/trends/trendingsearches/daily/rss?geo=IE`
            );
            const text = await response.text();
            const mentions = (text.match(new RegExp(keyword, 'gi')) || []).length;
            const volume = Math.min(1, mentions / 10);
            const sentiment = mentions > 5 ? 0.3 : 0;
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] Trends fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Update the field with all sources
    async update(): Promise<ConsciousnessState> {
        console.log('[Consciousness] Updating from live APIs...');
        
        const [twitter, news, trends] = await Promise.all([
            this.fetchTwitterSentiment('ireland business digital'),
            this.fetchNews('ireland business technology'),
            this.fetchGoogleTrends('digital products ireland')
        ]);
        
        const totalVolume = (twitter.volume + news.volume + trends.volume) / 3;
        const avgSentiment = (twitter.sentiment + news.sentiment + trends.sentiment) / 3;
        const noveltyIndex = totalVolume * Math.abs(avgSentiment);
        
        this.state.globalAwareness = Math.round((this.state.globalAwareness * 0.85 + totalVolume * 0.15) * 1000) / 1000;
        this.state.marketSentiment = Math.round((this.state.marketSentiment * 0.8 + avgSentiment * 0.2) * 1000) / 1000;
        
        if (noveltyIndex > 0.6) {
            this.state.enlightenmentEvents++;
            console.log('[Consciousness] Enlightenment event detected!');
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