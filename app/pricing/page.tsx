// app/pricing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Service } from '../lib/pricing-data';

export default function PricingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<string>('conteudo-seo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/pricing/plans');
        const data = await res.json();
        setServices(data.services);
        if (data.services.length > 0) {
          setActiveService(data.services[0].id);
        }
      } catch (err) {
        console.error('Erro ao carregar planos', err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const currentService = services.find(s => s.id === activeService);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planos que escalam contigo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolhe o serviço e o plano que melhor se adaptam ao teu negócio digital.
            Todos incluem autonomia inteligente e suporte do ecossistema ORIGINE.
          </p>
        </div>

        {/* Navegação de serviços */}
        {loading ? (
          <div className="text-center py-12">Carregando planos…</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeService === service.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200'
                  }`}
                >
                  {service.title.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>

            {/* Descrição do serviço */}
            {currentService && (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {currentService.title}
                  </h2>
                  <p className="text-gray-600 max-w-xl mx-auto">
                    {currentService.description}
                  </p>
                </div>

                {/* Cards dos planos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {currentService.plans.map(plan => (
                    <div
                      key={plan.id}
                      className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col border ${
                        plan.mostPopular ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-gray-200'
                      } hover:shadow-xl transition-shadow`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                          {plan.badge}
                        </span>
                      )}
                      {plan.mostPopular && !plan.badge && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                          Mais popular
                        </span>
                      )}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <div className="mt-3">
                          <span className="text-4xl font-extrabold text-gray-900">
                            {plan.priceLabel.includes('%') ? plan.priceLabel : plan.priceLabel}
                          </span>
                          {plan.price > 0 && !plan.priceLabel.includes('%') && (
                            <span className="text-gray-500 ml-1">/mês</span>
                          )}
                        </div>
                      </div>
                      <ul className="flex-1 space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${
                          plan.mostPopular
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Nota adicional do serviço */}
                <p className="text-center text-gray-500 text-sm mt-8">
                  {require('../lib/pricing-data').serviceComparisons[currentService.id]?.nota || ''}
                </p>
              </>
            )}
          </>
        )}

        {/* Call to Action final */}
        <div className="text-center mt-20 bg-indigo-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">Pronto para dominar o digital?</h3>
          <p className="mb-6 text-indigo-200">
            Junta‑te a centenas de criadores que já usam o ORIGINE.DIGITAL para escalar os seus negócios.
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition"
          >
            Criar Conta Grátis
          </a>
        </div>
      </div>
    </main>
  );
}
