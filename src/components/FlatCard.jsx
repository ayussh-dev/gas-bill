import { motion } from 'framer-motion';

const MotionButton = motion.button;
const MotionSpan = motion.span;

export default function FlatCard({ flatId, paid, readOnly, onToggle }) {
  return (
    <MotionButton
      layout
      whileHover={readOnly ? {} : { scale: 1.04 }}
      whileTap={readOnly ? {} : { scale: 0.96 }}
      onClick={() => !readOnly && onToggle(flatId)}
      aria-label={`Flat ${flatId} – ${paid ? 'Paid' : 'Unpaid'}${readOnly ? ' (read-only)' : ''}`}
      aria-pressed={paid}
      className={[
        'relative flex flex-col items-center justify-center rounded-2xl p-3 border transition-colors duration-300 select-none',
        paid
          ? 'bg-emerald-900/50 border-emerald-600/50 shadow-emerald-900/30 shadow-md'
          : 'bg-gray-800/70 border-gray-700/50',
        readOnly
          ? 'cursor-default opacity-80'
          : 'cursor-pointer hover:shadow-lg',
      ].join(' ')}
    >
      {/* Flat label */}
      <span className="text-lg font-bold tracking-widest text-gray-100">
        {flatId}
      </span>

      {/* Status badge */}
      <MotionSpan
        key={paid ? 'paid' : 'unpaid'}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={[
          'mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full',
          paid
            ? 'bg-emerald-500/20 text-emerald-300'
            : 'bg-gray-700/60 text-gray-400',
        ].join(' ')}
      >
        {paid ? '✓ Paid' : 'Unpaid'}
      </MotionSpan>

      {/* Glow for paid */}
      {paid && (
        <span className="absolute inset-0 rounded-2xl ring-1 ring-emerald-500/40 pointer-events-none" />
      )}
    </MotionButton>
  );
}
