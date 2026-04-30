// lib/intelligence/consciousness-field/field-manager.ts
// v2 — Integração com APIs reais (Twitter, Google Trends, NewsAPI)

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

    // Buscar dados do Twitter/X (API gratuita via nitter ou RSS)
    async fetchTwitterSentiment(keyword: string = 'ireland business'): Promise<{volume: number; sentiment: number}> {
        try {
            // Usar API pública do Twitter via proxy gratuito
            const response = await fetch(
                `https://nitter.net/search?f=tweets&q=${encodeURIComponent(keyword)}`,
                { headers: { 'Accept': 'text/html' } }
            );
            const text = await response.text();
            
            // Análise simples de sentimento baseada em palavras-chave
            const positiveWords = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch', 'new', 'best', 'great', 'excellent'];
            const negativeWords = ['crash', 'loss', 'fail', 'crisis', 'problem', 'issue', 'bad', 'worst', 'terrible', 'bankrupt'];
            
            let positive = 0;
            let negative = 0;
            let total = 0;
            
            positiveWords.forEach(w => {
                const matches = text.match(new RegExp(w, 'gi'));
                if (matches) positive += matches.length;
            });
            negativeWords.forEach(w => {
                const matches = text.match(new RegExp(w, 'gi'));
                if (matches) negative += matches.length;
            });
            
            total = positive + negative;
            const sentiment = total > 0 ? (positive - negative) / total : 0;
            const volume = Math.min(1, total / 100); // Normalizar para 0-1
            
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] Twitter fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Buscar dados do Google Trends (gratuito, sem API key)
    async fetchGoogleTrends(keyword: string = 'digital products ireland'): Promise<{volume: number; sentiment: number}> {
        try {
            // Usar RSS do Google Trends
            const response = await fetch(
                `https://trends.google.com/trends/trendingsearches/daily/rss?geo=IE`,
                { headers: { 'Accept': 'application/rss+xml' } }
            );
            const text = await response.text();
            
            // Contar menções relevantes
            const mentions = (text.match(new RegExp(keyword, 'gi')) || []).length;
            const volume = Math.min(1, mentions / 10);
            
            // Tendências diárias = sinal de mudança
            const sentiment = mentions > 5 ? 0.3 : 0; // positivo se há buzz
            
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] Trends fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Buscar notícias (NewsAPI — chave gratuita para desenvolvimento)
    async fetchNews(keyword: string = 'ireland business technology'): Promise<{volume: number; sentiment: number}> {
        try {
            // Usar API gratuita do NewsAPI (500 pedidos/dia grátis)
            const apiKey = process.env.NEWS_API_KEY || 'demo';
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`,
                { headers: { 'Accept': 'application/json' } }
            );
            
            if (!response.ok) return { volume: 0, sentiment: 0 };
            
            const data = await response.json();
            const articles = data.articles || [];
            
            // Análise de sentimento simples
            const positiveWords = ['growth', 'profit', 'success', 'innovation', 'opportunity', 'launch', 'new', 'best', 'great', 'excellent', 'rise', 'gain', 'positive'];
            const negativeWords = ['crash', 'loss', 'fail', 'crisis', 'problem', 'issue', 'bad', 'worst', 'terrible', 'bankrupt', 'decline', 'drop', 'negative'];
            
            let positive = 0;
            let negative = 0;
            
            articles.forEach((article: any) => {
                const text = (article.title + ' ' + (article.description || '')).toLowerCase();
                positiveWords.forEach(w => {
                    if (text.includes(w)) positive++;
                });
                negativeWords.forEach(w => {
                    if (text.includes(w)) negative++;
                });
            });
            
            const total = positive + negative;
            const sentiment = total > 0 ? (positive - negative) / total : 0;
            const volume = Math.min(1, articles.length / 20);
            
            return { volume, sentiment };
        } catch (e) {
            console.warn('[Consciousness] News fetch failed:', e);
            return { volume: 0, sentiment: 0 };
        }
    }

    // Atualizar o campo de consciência com dados reais
    async update(): Promise<ConsciousnessState> {
        console.log('[Consciousness] Updating field from real APIs...');
        
        // Buscar dados em paralelo
        const [twitter, news, trends] = await Promise.all([
            this.fetchTwitterSentiment('ireland business digital'),
            this.fetchNews('ireland business technology'),
            this.fetchGoogleTrends('digital products ireland')
        ]);
        
        // Calcular métricas agregadas
        const totalVolume = (twitter.volume + news.volume + trends.volume) / 3;
        const avgSentiment = (twitter.sentiment + news.sentiment + trends.sentiment) / 3;
        const noveltyIndex = totalVolume * Math.abs(avgSentiment); // Novidade = volume × intensidade
        
        // Atualizar estado (média móvel exponencial)
        this.state.globalAwareness = this.state.globalAwareness * 0.85 + totalVolume * 0.15;
        this.state.marketSentiment = this.state.marketSentiment * 0.8 + avgSentiment * 0.2;
        
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
        
        console.log('[Consciousness] Field updated:', this.state);
        return this.getState();
    }

    getState(): ConsciousnessState {
        return { ...this.state, sources: { ...this.state.sources } };
    }

    // Obter gap de consciência (diferença entre perceção e realidade)
    getGap(actualRealityCoherence: number): number {
        return Math.abs(this.state.globalAwareness - actualRealityCoherence);
    }
}