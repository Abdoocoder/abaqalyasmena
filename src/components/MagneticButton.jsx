import { useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, as: Tag = 'a', href, target, rel, onClick, className = '' }) => {
  const ref = useRef(null);

  const handleMouse = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleReset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  const MotionTag = Tag === 'a' ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleReset}
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
