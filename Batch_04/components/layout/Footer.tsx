import Link from "next/link"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const support = [
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Custom Requests" },
  { href: "/faq", label: "Support" },
]

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/delivery", label: "Delivery Policy" },
  { href: "/cookies", label: "Cookie Policy" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <div className="border-t border-zinc-200 bg-zinc-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p>Secure checkout • Digital delivery • Custom solutions available</p>
            <p>Built for modern brands, creators, and growing businesses</p>
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            <div className="xl:col-span-1">
              <Link href="/" className="inline-flex items-center text-lg font-semibold tracking-tight text-zinc-900">
                Origine.Digital
              </Link>
              <p className="mt-4 max-w-sm leading-8 text-zinc-600">
                Strategic digital products, intelligent systems, modern design,
                and practical online infrastructure for brands that want to grow properly.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Navigation
              </h3>
              <ul className="mt-5 space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 transition hover:text-zinc-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Services & Support
              </h3>
              <ul className="mt-5 space-y-3">
                {support.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 transition hover:text-zinc-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Legal
              </h3>
              <ul className="mt-5 space-y-3">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 transition hover:text-zinc-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-zinc-200 pt-6">
            <div className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {year} Origine.Digital. All rights reserved.</p>
              <p>Digital products • Services • AI-enabled systems</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
