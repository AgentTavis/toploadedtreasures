import { createContext, useContext, useMemo, useReducer, useState } from 'react'

const CartCtx = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.id === action.product.id)
      if (found) return state.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'inc':
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i))
    case 'dec':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [open, setOpen] = useState(false)

  const api = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const total = items.reduce((n, i) => n + i.qty * i.price, 0)
    return {
      items,
      open,
      setOpen,
      count,
      total,
      add: (product) => {
        dispatch({ type: 'add', product })
        setOpen(true)
      },
      inc: (id) => dispatch({ type: 'inc', id }),
      dec: (id) => dispatch({ type: 'dec', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open])

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
