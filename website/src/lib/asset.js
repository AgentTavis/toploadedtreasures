// Resolve a public asset path against the Vite base (subfolder hosting safe).
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`
