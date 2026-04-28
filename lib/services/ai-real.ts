// lib/services/ai-mock.ts – Mock completo (sem APIs externas)
export async function getAiDecision(params: any) {
    console.log('[AI MOCK] Simulando resposta para:', params);
    // Blog post
    if (params.prompt && params.prompt.includes('blog post')) {
        return {
            title: 'Artigo Simulado – Modo de Teste',
            content: '<p>Este conteúdo foi gerado pelo modo de simulação. Para conteúdo real, ative as chaves de API.</p>',
            metaDescription: 'Simulação sem custos.',
        };
    }
    // Social post
    if (params.prompt && params.prompt.includes('social media manager')) {
        return "Post simulado: testando automação de redes sociais! 🚀 #OrigineDigital #MockMode";
    }
    // Email campaign
    if (params.prompt && params.prompt.includes('email marketing specialist')) {
        return { subject: 'Teste de campanha (simulação)', bodyHtml: '<p>Email simulado. Integre com Brevo real para envios reais.</p>' };
    }
    // Decisão de negócio (upsell, etc.)
    return {
        action: 'upsell',
        expectedRoi: 0.25,
        reasoning: 'Modo simulação – decisão fictícia',
        risk: 0.1,
    };
}
