import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const MagneticButton = ({
  children,
  as: Tag = 'a',
  href,
  to,
  target,
  rel,
  onClick,
  className = '',
}) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouse = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const translateX = useTransform(x, (v) => v * 0.15)
  const translateY = useTransform(y, (v) => v * 0.15)

  const handleReset = () => {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: handleReset,
    className,
    whileTap: { scale: 0.97 },
    style: { translateX, translateY },
    transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
  }

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} onClick={onClick} className="contents">
          {children}
        </Link>
      </motion.div>
    )
  }

  const MotionTag = Tag === 'a' ? motion.a : motion.button

  return (
    <MotionTag
      {...motionProps}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  )
}

export default MagneticButton
