import { motion, AnimatePresence } from 'framer-motion';
import FlatCard from './FlatCard';

const MotionDiv = motion.div;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.018 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export default function FlatGrid({ flats, data, readOnly, onToggle, selectedMonth }) {
  // Group flats by block (first digit)
  const blocks = Array.from({ length: 10 }, (_, i) => ({
    label: `Block ${i}`,
    flats: flats.filter((id) => id.startsWith(String(i))),
  }));

  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={selectedMonth}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {blocks.map((block) => (
          <div key={block.label} className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              {block.label}
            </h3>
            <MotionDiv
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 sm:grid-cols-6 gap-3"
            >
              {block.flats.map((flatId) => (
                <MotionDiv key={flatId} variants={item}>
                  <FlatCard
                    flatId={flatId}
                    paid={!!data[flatId]}
                    readOnly={readOnly}
                    onToggle={onToggle}
                  />
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        ))}
      </MotionDiv>
    </AnimatePresence>
  );
}
