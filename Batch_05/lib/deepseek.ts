// lib/deepseek.ts
// DeepSeek AI Recommendation Service (with offline fallback)

export interface ProductForAI {
  id: string
  title: string
  category: string
  price: number
  description: string
}

export interface RecommendationResponse {
  productIds: string[]
  reasoning: string
  confidence: number
}

class DeepSeekRecommendationService {
  private apiKey: string
  private products: ProductForAI[] = []

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || ""
    if (!this.apiKey) {
      console.log("Offline mode: category-based recommendations active")
    }
  }

  setProducts(products: ProductForAI[]) {
    this.products = products
  }

  async getRecommendations(currentProductId: string, limit: number = 4): Promise<RecommendationResponse> {
    if (!this.apiKey || this.products.length === 0) {
      return this.getFallbackRecommendations(currentProductId, limit)
    }

    const currentProduct = this.products.find(p => p.id === currentProductId)
    if (!currentProduct) {
      return this.getFallbackRecommendations(currentProductId, limit)
    }

    try {
      const prompt = `Product: ${currentProduct.title} (${currentProduct.category})
Description: ${currentProduct.description}

Recommend ${limit} complementary products from this list:
${this.products.filter(p => p.id !== currentProductId).map(p => `- ID: ${p.id}, ${p.title} (${p.category})`).join("\n")}

Return ONLY the product IDs as a JSON array.`

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200,
        }),
      })

      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || ""
      
      const idMatches = aiResponse.match(/[a-zA-Z0-9-]+/g) || []
      const validIds = idMatches.filter(id => this.products.some(p => p.id === id))
      
      return {
        productIds: validIds.slice(0, limit),
        reasoning: "AI-powered recommendation",
        confidence: 0.85,
      }
    } catch (error) {
      console.log("API failed, using offline fallback")
      return this.getFallbackRecommendations(currentProductId, limit)
    }
  }

  private getFallbackRecommendations(currentProductId: string, limit: number): RecommendationResponse {
    const currentProduct = this.products.find(p => p.id === currentProductId)
    if (!currentProduct) {
      return { productIds: [], reasoning: "", confidence: 0 }
    }

    const sameCategory = this.products.filter(p => p.category === currentProduct.category && p.id !== currentProductId)
    const others = this.products.filter(p => p.category !== currentProduct.category && p.id !== currentProductId)
    const recommendations = [...sameCategory, ...others].slice(0, limit)
    
    return {
      productIds: recommendations.map(p => p.id),
      reasoning: "Similar products (offline mode)",
      confidence: 0.6,
    }
  }
}

export const deepseekRecommendations = new DeepSeekRecommendationService()