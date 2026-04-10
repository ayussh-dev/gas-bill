import { motion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionP = motion.p;

export default function SummaryBar({ summary }) {
  const { paid, unpaid, total } = summary;
  const paidPct = total > 0 ? (paid / total) * 100 : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Total */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 text-center">
        <p className="text-3xl font-extrabold text-gray-100">{total}</p>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Total</p>
      </div>

      {/* Paid */}
      <div className="bg-emerald-900/40 border border-emerald-700/40 rounded-2xl p-4 text-center">
        <MotionP
          key={paid}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-extrabold text-emerald-400"
        >
          {paid}
        </MotionP>
        <p className="text-xs text-emerald-400/70 mt-1 uppercase tracking-widest">Paid</p>
      </div>

      {/* Unpaid */}
      <div className="bg-rose-900/40 border border-rose-700/40 rounded-2xl p-4 text-center">
        <MotionP
          key={unpaid}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-extrabold text-rose-400"
        >
          {unpaid}
        </MotionP>
        <p className="text-xs text-rose-400/70 mt-1 uppercase tracking-widest">Unpaid</p>
      </div>

      {/* Progress bar — spans full width */}
      <div className="col-span-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Collection progress</span>
          <span>{Math.round(paidPct)}%</span>
        </div>
        <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
          <MotionDiv
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${paidPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
