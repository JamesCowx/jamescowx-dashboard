import { useState } from 'react';

export default function InvoiceDemo() {
  const [items, setItems] = useState([
    { id: 1, desc: 'Web Development', qty: 40, rate: 150 },
    { id: 2, desc: 'UI/UX Design', qty: 25, rate: 125 },
    { id: 3, desc: 'API Integration', qty: 15, rate: 175 },
  ]);
  const [taxRate, setTaxRate] = useState(8.5);

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  function updateItem(id: number, field: string, val: number) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: Math.max(0, val) } : i)));
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">🧾</div>
          <div>
            <h3 className="text-sm font-semibold">InvoiceFlow</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Invoice #INV-2025-0042 · USD</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Draft</span>
      </div>

      <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] pb-3 border-b border-white/[0.04]">
        <span>James Cowx LLC</span>
        <span>hello@jamescowx.com</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider pb-2">
          <span className="col-span-5">Description</span>
          <span className="col-span-2 text-right">Hours</span>
          <span className="col-span-2 text-right">Rate</span>
          <span className="col-span-3 text-right">Amount</span>
        </div>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center text-[12px]">
            <span className="col-span-5 text-[var(--color-text-secondary)]">{item.desc}</span>
            <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
              className="col-span-2 text-right bg-white/[0.02] border border-white/[0.04] rounded-lg px-2 py-1 text-white text-[11px] outline-none focus:border-[#60a5fa]/30" />
            <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
              className="col-span-2 text-right bg-white/[0.02] border border-white/[0.04] rounded-lg px-2 py-1 text-white text-[11px] outline-none focus:border-[#60a5fa]/30" />
            <span className="col-span-3 text-right font-medium text-white">${(item.qty * item.rate).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/[0.04] space-y-1.5">
        <div className="flex justify-between text-[11px]"><span className="text-[var(--color-text-muted)]">Subtotal</span><span className="text-white font-medium">${subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-[11px] items-center">
          <div className="flex items-center gap-2"><span className="text-[var(--color-text-muted)]">Tax</span>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-14 text-right bg-white/[0.02] border border-white/[0.04] rounded-lg px-2 py-0.5 text-[11px] text-white outline-none focus:border-[#60a5fa]/30" />
            <span className="text-[var(--color-text-muted)]">%</span>
          </div>
          <span className="text-white font-medium">${tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/[0.06]"><span>Total Due</span><span className="text-[#34d399]">${total.toLocaleString()}</span></div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2.5 bg-[#4f8fde] text-white rounded-xl text-sm font-medium hover:bg-[#60a5fa] hover:shadow-[0_4px_16px_rgba(96,165,250,0.2)] transition-all cursor-pointer">Send Invoice</button>
        <button className="px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] text-[var(--color-text-secondary)] rounded-xl text-sm font-medium hover:text-white hover:border-white/[0.1] transition-all cursor-pointer">PDF ↓</button>
      </div>
    </div>
  );
}
