// app/api/agent/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    // Resposta simulada enquanto não conecta com DeepSeek
    const responses = [
      "Ótima pergunta! Posso ajudar com isso.",
      "Entendi sua necessidade. Temos soluções específicas para isso.",
      "Baseado no que você me disse, recomendo nosso serviço de consultoria personalizada.",
      "Vou analisar sua situação e trazer as melhores opções.",
      "Temos produtos e serviços que se encaixam perfeitamente no seu caso."
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return NextResponse.json({ 
      reply: `${randomResponse}\n\nVocê gostaria de saber mais sobre alguma solução específica?`,
      suggestions: ["Produtos digitais", "Serviços", "Preços", "Agendar uma conversa"]
    })
  } catch (error) {
    return NextResponse.json({ reply: "Desculpe, tive um problema. Pode tentar novamente?" })
  }
}