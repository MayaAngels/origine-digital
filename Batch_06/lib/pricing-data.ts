// lib/pricing-data.ts
export interface Plan {
  id: string;
  name: string;
  price: number;             // EUR / mês
  priceLabel: string;        // ex: "€99/mês"
  features: string[];
  highlighted?: boolean;
  cta: string;               // texto do botão
  mostPopular?: boolean;
  badge?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  plans: Plan[];
}

export const services: Service[] = [
  {
    id: 'conteudo-seo',
    title: 'Criação de Conteúdo SEO Sob Demanda',
    description: 'Artigos de blog e posts para redes sociais gerados por IA, otimizados para SEO e com o DNA da tua marca.',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        price: 99,
        priceLabel: '€99/mês',
        features: [
          '4 artigos de blog / mês',
          '8 posts para redes sociais / mês',
          'Pesquisa de palavras‑chave básica',
          'IA Standard',
          'Dashboard de métricas simples'
        ],
        cta: 'Começar Grátis',
        highlighted: false
      },
      {
        id: 'growth',
        name: 'Growth',
        price: 249,
        priceLabel: '€249/mês',
        features: [
          '12 artigos de blog / mês',
          '24 posts para redes sociais / mês',
          'Pesquisa avançada de palavras‑chave',
          'Análise de 1 domínio concorrente',
          'IA Premium (tom de voz adaptável)',
          'Relatórios de posicionamento'
        ],
        mostPopular: true,
        cta: 'Experimentar Growth',
        highlighted: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 499,
        priceLabel: '€499/mês',
        features: [
          'Artigos ilimitados* (até 50/dia)',
          'Posts ilimitados*',
          'Pesquisa completa + tendências',
          'Análise de 3 domínios concorrentes',
          'IA Dedicada + agendamento automático',
          'Suporte prioritário'
        ],
        badge: 'Melhor valor',
        cta: 'Falar com Vendas',
        highlighted: false
      }
    ]
  },
  {
    id: 'email-marketing',
    title: 'Motor Autónomo de Email Marketing',
    description: 'Recuperação de carrinhos, newsletters e campanhas inteligentes que se disparam sozinhas com base no comportamento do cliente.',
    plans: [
      {
        id: 'essentials',
        name: 'Essentials',
        price: 79,
        priceLabel: '€79/mês',
        features: [
          '3 fluxos de campanha automáticos',
          'Até 500 carrinhos recuperados/mês',
          'Segmentação básica',
          'Relatórios de abertura/clique'
        ],
        cta: 'Começar'
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 199,
        priceLabel: '€199/mês',
        features: [
          '10 fluxos de campanha',
          'Até 2.000 carrinhos recuperados/mês',
          'Segmentação avançada por IA',
          'Relatórios completos com ROI',
          'Email + SMS'
        ],
        mostPopular: true,
        cta: 'Ver Professional'
      },
      {
        id: 'performance',
        name: 'Performance',
        price: 0, // será calculado como % da receita
        priceLabel: '10% da receita adicional*',
        features: [
          'Fluxos ilimitados',
          'Recuperação ilimitada',
          'Segmentação preditiva',
          'Relatórios em tempo real',
          'Email + SMS + Carta física',
          'Sem custo fixo – só pagas pelo que recuperares'
        ],
        badge: 'Sem risco',
        cta: 'Saber mais',
        highlighted: false
      }
    ]
  },
  {
    id: 'fabrica-produtos',
    title: 'Fábrica de Produtos Digitais',
    description: 'Cria ebooks, templates, mini‑cursos e checklists personalizados automaticamente com a tua marca.',
    plans: [
      {
        id: 'creator',
        name: 'Creator',
        price: 49,
        priceLabel: '€49/mês',
        features: [
          '10 produtos digitais / mês',
          'Ebooks e checklists',
          '5 templates exclusivos',
          'Acesso ao marketplace (compra)'
        ],
        cta: 'Criar Produtos'
      },
      {
        id: 'business',
        name: 'Business',
        price: 149,
        priceLabel: '€149/mês',
        features: [
          '40 produtos / mês',
          'Mini‑cursos e templates',
          '20 templates exclusivos',
          'Marketplace (compra e venda)',
          'Marca branca parcial'
        ],
        mostPopular: true,
        cta: 'Produzir Agora'
      },
      {
        id: 'empire',
        name: 'Empire',
        price: 299,
        priceLabel: '€299/mês',
        features: [
          'Produtos ilimitados*',
          'Todos os tipos + white‑label total',
          'Templates ilimitados',
          'Marketplace com destaque VIP',
          'Modo Auto‑Pilot (criação automática)'
        ],
        badge: 'Topo de gama',
        cta: 'Domina o Mercado'
      }
    ]
  },
  {
    id: 'comunicacao-omnicanal',
    title: 'Comunicação Unificada Omnicanal',
    description: 'Envio coordenado de emails, cartas físicas e posts sociais a partir de um único painel, com orquestração inteligente.',
    plans: [
      {
        id: 'solo',
        name: 'Solo',
        price: 99,
        priceLabel: '€99/mês',
        features: [
          '5.000 emails',
          '100 cartas físicas',
          '30 posts sociais',
          'Painel unificado'
        ],
        cta: 'Unificar Canais'
      },
      {
        id: 'equipa',
        name: 'Equipa',
        price: 299,
        priceLabel: '€299/mês',
        features: [
          '25.000 emails',
          '500 cartas físicas',
          '150 posts sociais',
          'Colaboração multi‑utilizador',
          'Orquestração avançada'
        ],
        mostPopular: true,
        cta: 'Trabalhar em Equipa'
      },
      {
        id: 'agencia',
        name: 'Agência',
        price: 899,
        priceLabel: '€899/mês',
        features: [
          '100.000 emails',
          '2.000 cartas físicas',
          'Posts ilimitados',
          'White‑label total',
          'Orquestração preditiva',
          'Suporte dedicado'
        ],
        badge: 'Para revenda',
        cta: 'Escalar Agora'
      }
    ]
  },
  {
    id: 'marketplace',
    title: 'Marketplace Peer‑to‑Peer',
    description: 'Vende os teus produtos digitais ou compra os de outros criadores dentro da comunidade ORIGINE, com comissões automáticas.',
    plans: [
      {
        id: 'standard',
        name: 'Transação Padrão',
        price: 0,
        priceLabel: '15% por venda',
        features: [
          'Publicação ilimitada',
          'Pagamento via Stripe',
          'Garantia de entrega',
          'Avaliações e reputação'
        ],
        cta: 'Publicar Produto'
      },
      {
        id: 'pro',
        name: 'Vendedor Pro',
        price: 29,  // opcional: mensalidade fixa + comissão reduzida
        priceLabel: '€29/mês + 10%',
        features: [
          'Destaque nas buscas',
          'Selo de confiança',
          'Comissão reduzida (10%)',
          'Suporte prioritário'
        ],
        mostPopular: true,
        cta: 'Ser Pro'
      },
      {
        id: 'premium',
        name: 'Premium (Convite)',
        price: 99,
        priceLabel: '€99/mês + 5%',
        features: [
          'Loja personalizada',
          'Comissão ultra‑reduzida (5%)',
          'Acesso antecipado a novos produtos',
          'IA de criação exclusiva'
        ],
        badge: 'Elite',
        cta: 'Candidatar‑me'
      }
    ]
  }
];

// Dados para página de comparação (opcional)
export const serviceComparisons = {
  'conteudo-seo': { nota: 'Todos os planos incluem acesso ao chat de suporte e atualizações da IA.' },
  'email-marketing': { nota: 'Plano Performance: apenas pagas se houver receita adicional rastreável. Faturação mensal automática.' },
  'fabrica-produtos': { nota: 'Limite diário gerido automaticamente pela plataforma para manter a qualidade.' },
  'comunicacao-omnicanal': { nota: 'As cartas físicas são enviadas via parceiro logístico; preço inclui porte nacional.' },
  'marketplace': { nota: 'A subscrição Pro e Premium tem um custo fixo mensal além da comissão por venda.' }
};
