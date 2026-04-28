// app/partner/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    currentMonthlySales: 0,
    employees: 1,
    hasWebsite: false,
    hasBooking: false,
    email: ""
  })
  const router = useRouter()

  const handleSubmit = async () => {
    const response = await fetch('/api/partner/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      router.push('/partner/dashboard')
    } else {
      alert('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Origine.Grow</h1>
        <p className="text-muted-foreground">Vamos entender melhor o seu negócio</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 text-center">
              <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${
                s <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {s}
              </div>
              <div className="text-xs mt-1 hidden md:block">
                {s === 1 && "Negócio"}
                {s === 2 && "Métricas"}
                {s === 3 && "Pagamento"}
                {s === 4 && "Confirmação"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do negócio *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Setor *</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option value="salon">Salão de Beleza / Estética</option>
              <option value="ecommerce">E-commerce</option>
              <option value="consulting">Consultoria</option>
              <option value="education">Educação</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <button className="btn-primary w-full" onClick={() => setStep(2)}>
            Continuar →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vendas mensais atuais (€) *</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.currentMonthlySales}
              onChange={(e) => setFormData({ ...formData, currentMonthlySales: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Número de funcionários</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.hasWebsite}
                onChange={(e) => setFormData({ ...formData, hasWebsite: e.target.checked })}
              />
              <span>Tem website</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.hasBooking}
                onChange={(e) => setFormData({ ...formData, hasBooking: e.target.checked })}
              />
              <span>Tem sistema de reservas</span>
            </label>
          </div>
          <div className="flex gap-4">
            <button className="btn-outline" onClick={() => setStep(1)}>
              ← Voltar
            </button>
            <button className="btn-primary flex-1" onClick={() => setStep(3)}>
              Continuar →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Resumo do programa</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ Acesso total a todos os produtos e cursos</li>
              <li>✅ Depósito inicial: €50 (reembolsável)</li>
              <li>✅ Meta personalizada: {Math.ceil(formData.currentMonthlySales * 1.5)} vendas/mês</li>
              <li>✅ Você só paga DEPOIS de atingir a meta</li>
            </ul>
          </div>
          
          <button
            className="btn-primary w-full"
            onClick={() => {
              // Processar pagamento de €50
              setStep(4)
            }}
          >
            Pagar €50 (reembolsável) e começar →
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold">Cadastro concluído!</h2>
          <p className="text-muted-foreground">
            Seu acesso foi liberado. Comece a explorar todos os recursos.
          </p>
          <button className="btn-primary" onClick={handleSubmit}>
            Ir para o Dashboard
          </button>
        </div>
      )}
    </div>
  )
}