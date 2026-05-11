import { motion } from 'framer-motion';

const floatSpring = {
  y: [0, -8, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};

const FloatingImage = ({ src, alt, className = '' }) => (
  <motion.div className={className} animate={floatSpring}>
    <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl pointer-events-none" />
  </motion.div>
);

export default FloatingImage;
