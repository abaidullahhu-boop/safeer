import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSearch, FileCheck, ShieldCheck, Send, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'File check',
    desc: 'We look at your job, bank, and travel history. If the case is weak, we say so before you spend money.',
    icon: FileSearch,
  },
  {
    step: '02',
    title: 'Documents',
    desc: 'Checklist, cover letter, flight reservation (PNR), and hotel voucher that the embassy can verify.',
    icon: FileCheck,
  },
  {
    step: '03',
    title: 'Appointment',
    desc: 'Gerry’s / VFS / TLS slot in Lahore or Islamabad, file order, and interview practice if needed.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'After the decision',
    desc: 'Passport tracking, stamp check, and travel notes. We do not guarantee approval — that is the embassy.',
    icon: Send,
  },
];

export const TravelProcess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="process-section"
      className="relative w-full pt-28 pb-40 md:pt-36 md:pb-52 bg-[#FBFAF6] text-[#0C2A5C] rounded-t-[1.75rem] sm:rounded-t-[2rem] shadow-[0_-16px_48px_rgba(6,20,40,0.14)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="reveal-text mb-10 max-w-2xl">
          <span className="tag-gold">
            <span className="w-2 h-2 rounded-full bg-[#B58638]" />
            <span>04 — How it works</span>
          </span>
          <h2
            className="font-sans font-extrabold mt-4"
            style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.15 }}
          >
            Four steps. One WhatsApp thread.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((st) => (
            <div key={st.step} className="reveal-card p-6 rounded-3xl card-pearl border border-[#E3C078]/30">
              <st.icon className="w-6 h-6 text-[#B58638] mb-4" />
              <p className="text-[12px] font-sans font-bold text-[#85601B] uppercase tracking-wider">
                Step {st.step}
              </p>
              <h3 className="font-sans text-xl font-extrabold mt-1">{st.title}</h3>
              <p className="mt-2 text-sm text-[#0C2A5C]/75 font-sans leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/contact')}
          className="mt-10 px-6 py-3 rounded-full btn-gold text-xs font-sans font-bold uppercase inline-flex items-center gap-2"
        >
          Start with a file check
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
