import Link from "next/link"

const links = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function SiteLinks({
  className = "",
  itemClassName = "",
}: {
  className?: string
  itemClassName?: string
}) {
  return (
    <nav className={className} aria-label="Site links">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={itemClassName}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
