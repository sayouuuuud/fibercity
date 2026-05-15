import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type ContentCardProps = {
  href: string
  title: string
  eyebrow: string
  excerpt: string
  image: string
  meta?: string
}

export function ContentCard({ href, title, eyebrow, excerpt, image, meta }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[2rem] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
          {eyebrow}
        </span>
      </div>
      <div className="p-6">
        {meta && <div className="folio text-muted-foreground">{meta}</div>}
        <div className="mt-3 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl leading-tight tracking-tight">{title}</h2>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
      </div>
    </Link>
  )
}
