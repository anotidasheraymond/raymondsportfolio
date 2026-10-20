import { STAMPS } from '@/lib/passport'
import { pressStamp } from '@/lib/stamps-node'

// Each role's stamp, pressed by the Stamp Studio compiler at build time and served as a static SVG.

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(STAMPS).map((id) => ({ id }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const spec = STAMPS[id]
  if (!spec) return new Response('Not found', { status: 404 })
  return new Response(await pressStamp(id, spec), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  })
}
