export const metadata = {
  title: "About | Origine.Digital",
  description: "Digital products, business systems, and done-for-you services for Irish small businesses.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Origine.Digital
        </h1>
        <p className="text-xl text-muted-foreground">
          We help businesses launch, organize, and grow with precision.
        </p>
      </div>
      <div className="space-y-8">
        <section className="bg-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">Our Mission</h2>
          <p className="text-indigo-800 leading-relaxed">
            To provide intelligent digital products, business systems, and execution services
            that help entrepreneurs and small businesses operate with clarity, efficiency, and confidence.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-xl p-4">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Systems Over Chaos</div>
              <p className="text-sm text-muted-foreground">Great businesses run on great systems, not constant fire-fighting.</p>
            </div>
            <div className="border rounded-xl p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold">Practical Over Pretty</div>
              <p className="text-sm text-muted-foreground">Digital products should be useful, not just beautiful.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}