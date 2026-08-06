import Icon from '../../components/common/Icon.jsx'
import GlowCard from '../../components/ui/GlowCard.jsx'
import { asset } from '../../lib/asset'
import { useCart } from './CartContext.jsx'

export default function ProductCard({ product, onOpen }) {
  const cart = useCart()
  return (
    <GlowCard customSize className="surface surface-hover group flex flex-col overflow-hidden">
      <button
        onClick={() => onOpen(product)}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-navy-850"
        aria-label={`View ${product.name}`}
      >
        <img
          src={asset(product.img)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-navy-950/75 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gold backdrop-blur">
          {product.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg leading-tight text-cream">{product.name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cream/55">
            {product.sport}
          </span>
          <span className="rounded border border-gold/25 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold/90">
            {product.grade}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-cream">${product.price}</span>
          {/* Products sold per sport (Mystery Packs) must not be added straight from the grid,
              or they land in the cart with no sport chosen. Send those to the detail view. */}
          {product.sports ? (
            <button
              onClick={() => onOpen(product)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 font-display text-sm uppercase tracking-wide text-navy-950 transition hover:bg-gold-hi"
            >
              <Icon name="plus" size={16} /> Pick sport
            </button>
          ) : (
            <button
              onClick={() => cart.add(product)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 font-display text-sm uppercase tracking-wide text-navy-950 transition hover:bg-gold-hi"
            >
              <Icon name="plus" size={16} /> Add
            </button>
          )}
        </div>
      </div>
    </GlowCard>
  )
}
