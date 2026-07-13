import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 149.99, rating: 4.8, reviews: 2341, image: '🎧', badge: 'Best Seller', color: '#60a5fa' },
  { id: 2, name: 'Mechanical Keyboard', price: 189.99, rating: 4.9, reviews: 1856, image: '⌨️', badge: 'Hot', color: '#f472b6' },
  { id: 3, name: 'USB-C Hub 7-in-1', price: 49.99, rating: 4.6, reviews: 4127, image: '🔌', badge: 'Value', color: '#34d399' },
  { id: 4, name: '27" 4K Monitor', price: 449.99, rating: 4.7, reviews: 892, image: '🖥', badge: 'New', color: '#a78bfa' },
  { id: 5, name: 'Webcam 4K Pro', price: 129.99, rating: 4.5, reviews: 1567, image: '📸', badge: undefined, color: '#fbbf24' },
  { id: 6, name: 'Laptop Stand', price: 39.99, rating: 4.8, reviews: 3201, image: '💻', badge: 'Popular', color: '#38bdf8' },
];

export default function ShopDemo() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [tab, setTab] = useState<'shop' | 'cart'>('shop');
  const [toast, setToast] = useState<string | null>(null);

  function addToCart(id: number) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const p = products.find((p) => p.id === id);
    setToast(`Added ${p?.name} to cart`);
    setTimeout(() => setToast(null), 1800);
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const next = { ...prev };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id]--;
      return next;
    });
  }

  const cartItems = products.filter((p) => cart[p.id]);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-5 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center text-sm">🛒</div>
          <div>
            <h3 className="text-sm font-semibold">ShopForge</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Headless E-Commerce · AI Recommendations</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTab('shop')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${tab === 'shop' ? 'bg-white/[0.06] text-white border border-white/[0.1]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>
            Shop
          </button>
          <button onClick={() => setTab('cart')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer relative ${tab === 'cart' ? 'bg-white/[0.06] text-white border border-white/[0.1]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#f472b6] text-white text-[9px] font-bold flex items-center justify-center">{cartCount}</span>
            )}
          </button>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">{cartCount} items</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', 'Audio', 'Peripherals', 'Displays', 'Accessories'].map((cat) => (
          <button key={cat} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${cat === 'All' ? 'bg-white/[0.04] border-white/[0.08] text-white' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      {tab === 'shop' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products.map((p) => (
            <motion.div key={p.id} whileHover={{ y: -2 }}
              className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 hover:border-white/[0.1] transition-all cursor-pointer group">
              <div className="relative mb-3">
                <div className="h-24 rounded-lg flex items-center justify-center text-4xl" style={{ background: `linear-gradient(135deg, ${p.color}10, ${p.color}05)` }}>
                  {p.image}
                </div>
                {p.badge && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-black/40 backdrop-blur-sm text-white">{p.badge}</span>
                )}
                <button onClick={() => addToCart(p.id)}
                  className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-lg bg-white/10 border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#60a5fa] cursor-pointer text-xs">
                  +
                </button>
              </div>
              <p className="text-[12px] font-medium line-clamp-1 mb-1">{p.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">${p.price}</span>
                <span className="text-[10px] text-yellow-400">★ {p.rating}</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{p.reviews.toLocaleString()} reviews</p>
              {cart[p.id] && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] text-[#34d399]">{cart[p.id]} in cart</span>
                  <span className="text-[10px] text-[#34d399] font-bold">${(p.price * cart[p.id]).toFixed(2)}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-4xl opacity-20">🛒</span>
                <p className="text-sm text-[var(--color-text-muted)]">Your cart is empty</p>
                <button onClick={() => setTab('shop')} className="text-[11px] text-[#60a5fa] hover:underline cursor-pointer">Browse products</button>
              </div>
            ) : (
              cartItems.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <span className="text-2xl">{p.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium">{p.name}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">${p.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(p.id)}
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.1] transition-all cursor-pointer text-xs">
                      −
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{cart[p.id]}</span>
                    <button onClick={() => addToCart(p.id)}
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.1] transition-all cursor-pointer text-xs">
                      +
                    </button>
                  </div>
                  <span className="text-sm font-bold text-white w-20 text-right">${(p.price * (cart[p.id] || 0)).toFixed(2)}</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          {cartItems.length > 0 && (
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-[11px]"><span className="text-[var(--color-text-muted)]">Subtotal</span><span className="text-white font-medium">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-[var(--color-text-muted)]">Shipping</span><span className="text-[#34d399]">Free</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-[var(--color-text-muted)]">Tax</span><span className="text-white font-medium">${(cartTotal * 0.08).toFixed(2)}</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/[0.06]"><span>Total</span><span className="text-white">${(cartTotal * 1.08).toFixed(2)}</span></div>
              <button className="w-full py-2.5 bg-gradient-to-r from-[#4f8fde] to-[#60a5fa] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_20px_rgba(96,165,250,0.2)] transition-all cursor-pointer">
                Checkout → ${(cartTotal * 1.08).toFixed(2)}
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 px-4 py-2.5 rounded-xl bg-[#04050f] border border-white/[0.1] text-[12px] font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 whitespace-nowrap">
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
