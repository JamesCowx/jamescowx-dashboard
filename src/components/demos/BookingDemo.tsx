import { useState } from 'react';
import { motion } from 'framer-motion';

const doctors = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cardiologist', rating: 4.9, slots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:00 PM'], avatar: '👩‍⚕️' },
  { id: 2, name: 'Dr. James Park', specialty: 'Dermatologist', rating: 4.8, slots: ['9:30 AM', '11:00 AM', '1:00 PM', '3:30 PM'], avatar: '👨‍⚕️' },
  { id: 3, name: 'Dr. Maria Lopez', specialty: 'Pediatrician', rating: 4.9, slots: ['10:00 AM', '12:30 PM', '2:30 PM', '5:00 PM'], avatar: '👩‍⚕️' },
];

export default function BookingDemo() {
  const [selectedDoc, setSelectedDoc] = useState<typeof doctors[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [step, setStep] = useState(0);
  const [booked, setBooked] = useState(false);

  function book() {
    if (!selectedDoc || !selectedSlot) return;
    setBooked(true);
  }

  function reset() {
    setSelectedDoc(null);
    setSelectedSlot('');
    setStep(0);
    setBooked(false);
  }

  if (booked) {
    return (
      <div className="liquid-glass rounded-2xl p-8 text-center space-y-5">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </motion.div>
        <div>
          <h3 className="text-xl font-bold">Appointment Confirmed!</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Your telemedicine session has been booked</p>
        </div>
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04] space-y-2 text-left">
          {[
            { label: 'Doctor', value: selectedDoc?.name },
            { label: 'Specialty', value: selectedDoc?.specialty },
            { label: 'Date', value: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) },
            { label: 'Time', value: selectedSlot },
            { label: 'Type', value: 'Video Consultation' },
            { label: 'Meeting Link', value: 'mediconnect.com/join/abc123', isLink: true },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[11px] text-[var(--color-text-muted)]">{label}</span>
              <span className={`text-[12px] font-medium ${label === 'Meeting Link' ? 'text-[#60a5fa]' : 'text-white'}`}>{value}</span>
            </div>
          ))}
        </div>
        <button onClick={reset} className="px-6 py-2.5 bg-[#4f8fde] text-white rounded-xl text-sm font-medium hover:bg-[#60a5fa] hover:shadow-[0_4px_20px_rgba(96,165,250,0.2)] transition-all cursor-pointer">
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">🏥</div>
          <div>
            <h3 className="text-sm font-semibold">MediConnect</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Telemedicine · HIPAA Compliant</div>
          </div>
        </div>
        <div className="flex gap-1">
          {['Doctor', 'Time', 'Confirm'].map((s, i) => (
            <span key={s} className={`text-[10px] px-2 py-0.5 rounded-md ${step >= i ? 'bg-[#60a5fa]/10 text-[#60a5fa]' : 'bg-white/[0.03] text-[var(--color-text-muted)]'}`}>
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </div>

      <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-[#60a5fa] to-[#34d399] rounded-full" animate={{ width: `${((step + (selectedSlot ? 1.5 : 0)) / 3) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {doctors.map((doc) => (
          <motion.button key={doc.id} onClick={() => { setSelectedDoc(doc); setSelectedSlot(''); setStep(1); }}
            whileHover={{ y: -2 }}
            className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${selectedDoc?.id === doc.id ? 'bg-white/[0.04] border-[#60a5fa]/30 shadow-[0_0_20px_rgba(96,165,250,0.1)]' : 'bg-white/[0.01] border-white/[0.04] hover:border-white/[0.1]'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{doc.avatar}</span>
              <div>
                <p className="text-[12px] font-semibold">{doc.name}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{doc.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-yellow-400">★ {doc.rating}</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">{doc.slots.length} slots</span>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedDoc && (
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] mb-3">
            Select time with {selectedDoc.name} — {selectedDoc.specialty}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {selectedDoc.slots.map((slot) => (
              <button key={slot} onClick={() => { setSelectedSlot(slot); setStep(2); }}
                className={`px-2 py-2 rounded-xl text-[11px] font-medium transition-all duration-200 cursor-pointer border ${selectedSlot === slot ? 'bg-[#60a5fa]/15 border-[#60a5fa]/40 text-[#60a5fa]' : 'bg-white/[0.02] border-white/[0.05] text-[var(--color-text-secondary)] hover:border-white/[0.1] hover:text-white'}`}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="text-center">
          <button onClick={book} className="px-8 py-3 bg-gradient-to-r from-[#4f8fde] to-[#34d399] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_24px_rgba(96,165,250,0.2)] transition-all cursor-pointer">
            Confirm Video Appointment →
          </button>
        </div>
      )}
    </div>
  );
}
