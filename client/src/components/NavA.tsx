import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as icons from './Icons'
import { AvailableIcons } from '@components/Icons'

const navAVariants = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 50 },
  },
  exit: {
    y: '-100vh',
    transition: { type: 'spring', stiffness: 50 },
  },
}

export default function NavA({
  href,
  children,
  icon,
  className,
}: {
  href: string
  children: React.ReactNode
  icon: AvailableIcons
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = icons[icon]

  function onIconClick() {
    setIsOpen(o => !o)
  }

  return (
    <motion.div
      variants={navAVariants}
      className={`flex mt-4 md:mt-0 break-all ${className || ''}`}
    >
      {Icon && <Icon onClick={onIconClick} />}
        {isOpen && (
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex ml-3 items-center font-bold underline'
            href={href}
          >
            {children}
          </motion.a>
        )}
    </motion.div>
  )
}
