import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// "( Label" eyebrow used at the top of each editorial section
export const Eyebrow = ({ children }) => (
  <p className="t-label flex items-center gap-2 text-muted">
    <span className="text-ink">(</span>
    <span>{children}</span>
  </p>
);

// Heading whose lines slide up from a mask when scrolled into view.
// `lines` is an array of React nodes, one per line.
export const RevealLines = ({ as: Tag = 'h2', lines, label, className = '', indentLast = false }) => (
  <Tag className={className}>
    <span className="sr-only">{label}</span>
    <span aria-hidden="true" className="block">
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden pt-[0.06em] pb-[0.12em] -mb-[0.12em] ${
            indentLast && i === lines.length - 1 ? 'md:pl-[1.2em]' : ''
          }`}
        >
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  </Tag>
);

// Fade-and-rise wrapper for body content
export const Rise = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.9, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const ArrowUpRight = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);
