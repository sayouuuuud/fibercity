type JsonLdData = Record<string, unknown>

interface JsonLdProps {
  data: JsonLdData | JsonLdData[]
  id?: string
}

/**
 * Renders a single `<script type="application/ld+json">` tag.
 *
 * This is a server-only component — we never re-render it on the client,
 * so search engines see structured data in the initial HTML.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const safe = JSON.stringify(data).replace(/</g, "\\u003c")
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
