import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Container } from './Editorial';
import { pages } from '../data/pages';
import { projects } from '../data/projects';
import profileImage from '../assets/about/image.png';

const pad = (n) => String(n).padStart(2, '0');
const EASE = [0.16, 1, 0.3, 1];

const ArrowRight = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ---------- Preview cards shown in the floating hover panel ----------

const WindowBar = ({ title }) => (
  <div className="flex h-7 items-center gap-3 border-b border-white/10 bg-[#161917] px-3">
    <div className="flex gap-1">
      <span className="size-2 rounded-full bg-white/15" />
      <span className="size-2 rounded-full bg-white/15" />
      <span className="size-2 rounded-full bg-white/15" />
    </div>
    <span className="mx-auto rounded bg-white/5 px-3 py-0.5 font-[family-name:var(--font-geist-mono)] text-[9px] text-white/50">{title}</span>
    <span className="w-8" />
  </div>
);

const AboutPreview = () => (
  <div className="relative h-full overflow-hidden rounded-xl">
    <img src={profileImage} alt="" className="h-full w-full object-cover object-[50%_25%]" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-white">
      <div>
        <p className="text-lg font-semibold tracking-[-0.03em]">Sneha S</p>
        <p className="text-xs text-white/70">Full-Stack Engineer</p>
      </div>
      <p className="t-label text-white/60">Coimbatore</p>
    </div>
  </div>
);

const ProcessPreview = () => (
  <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1110] text-white">
    <WindowBar title="process — roadmap" />
    <div className="flex flex-col gap-3 p-4">
      {[
        ['Define', 'w-full', 'Done'],
        ['Design', 'w-full', 'Done'],
        ['Build', 'w-2/3', 'In progress'],
        ['Launch', 'w-1/5', 'Next']
      ].map(([stage, width, status], i) => (
        <div key={stage} className="flex items-center gap-3">
          <span className="w-5 font-[family-name:var(--font-geist-mono)] text-[9px] text-accent">{pad(i + 1)}</span>
          <span className="w-14 text-xs font-medium">{stage}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className={`block h-full rounded-full bg-accent ${width}`} />
          </span>
          <span className="w-16 text-right text-[9px] text-white/50">{status}</span>
        </div>
      ))}
    </div>
    <div className="mx-4 border-t border-white/10 pt-3">
      <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.14em] text-white/40 uppercase">Recent activity</p>
      <ul className="mt-2 flex flex-col gap-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] text-white/70">
        <li><span className="text-accent">feat</span> wireframes approved</li>
        <li><span className="text-accent">feat</span> REST API + auth flow</li>
        <li><span className="text-white/40">next</span> deploy to cloud</li>
      </ul>
    </div>
  </div>
);

const WorkPreview = () => (
  <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1110] text-white">
    <WindowBar title="sneha — selected work" />
    <div className="grid grid-cols-3 gap-2 p-3">
      {projects.slice(-6).reverse().map((project) => (
        <div key={project.number} className="flex h-[4.6rem] flex-col justify-between rounded-lg bg-white/[0.06] p-2">
          <span className="font-[family-name:var(--font-geist-mono)] text-[8px] text-white/40">{pad(project.number)}</span>
          <span className="line-clamp-2 text-[10px] leading-tight font-semibold">{project.title}</span>
          <span className="truncate text-[8px] text-accent">{project.tech[0]}</span>
        </div>
      ))}
    </div>
  </div>
);

const ContactPreview = () => (
  <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-accent p-5 text-white">
    <p className="t-label text-white/70">Contact</p>
    <p className="text-[2rem] leading-[0.95] font-semibold tracking-[-0.045em]">
      Let's work
      <br />
      <span className="font-[family-name:var(--font-instrument)] font-normal italic">together.</span>
    </p>
    <p className="truncate text-xs text-white/80">sneha.shanmugam014@gmail.com</p>
  </div>
);

const previews = {
  about: AboutPreview,
  services: ProcessPreview,
  projects: WorkPreview,
  contact: ContactPreview
};

// ---------- Explore list ----------

const Explore = () => {
  const listRef = useRef(null);
  const [active, setActive] = useState(null);

  // Cursor position relative to the list; the card trails it on a spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const cardY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = listRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Start the card under the pointer instead of springing in from the corner
  const handleMouseEnter = (e) => {
    handleMouseMove(e);
    cardX.jump(mouseX.get());
    cardY.jump(mouseY.get());
  };

  return (
    <section className="editorial grain bg-paper pt-16 pb-24 md:pt-24 md:pb-32">
      <Container>
        <div className="mb-8 flex items-baseline justify-between md:mb-12">
          <h2 className="t-label text-muted">Explore</h2>
          <p className="t-label text-muted">{pad(pages.length)}</p>
        </div>

        <div
          ref={listRef}
          className="relative lg:cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActive(null)}
        >
          <ul className="group/list border-b border-ink">
            {pages.map((page, i) => (
              <motion.li
                key={page.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                onMouseEnter={() => setActive(i)}
                className="border-t border-ink"
              >
                <a
                  href={`#${page.id}`}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 transition-opacity duration-500 group-hover/list:opacity-30 hover:!opacity-100 focus-visible:!opacity-100 md:grid-cols-[4rem_1fr_18rem_auto] md:py-6"
                >
                  <span className="t-label text-muted transition-colors duration-500 group-hover:text-accent">{pad(i + 1)}</span>
                  <span className="text-[clamp(1.75rem,3.6vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3">
                    {page.name}
                  </span>
                  <span className="hidden text-sm text-muted md:block">{page.blurb}</span>
                  <span className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:size-12">
                    <span className="transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:opacity-0">
                      <ArrowUpRight />
                    </span>
                    <span className="absolute -translate-x-4 opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowRight />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Floating preview card + cursor dot (desktop pointer only) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
            style={{ x: cardX, y: cardY }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute -top-[9.5rem] -left-[9rem] h-[19rem] w-[28rem] rounded-[1.5rem] bg-[#1f2620] p-4 shadow-[0_2.5em_5em_-1.5em_rgb(0_0_0/0.45)]"
                >
                  <div className="h-full overflow-hidden rounded-xl">
                    <motion.div
                      className="h-full"
                      animate={{ y: `${-(active ?? 0) * 100}%` }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      {pages.map((page) => {
                        const Preview = previews[page.id];
                        return (
                          <div key={page.id} className="h-full">
                            <Preview />
                          </div>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cursor dot follows the pointer exactly; replaces the hidden cursor */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
            style={{ x: mouseX, y: mouseY }}
          >
            <motion.span
              className="absolute -top-7 -left-7 block size-14 rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/0.15)]"
              initial={false}
              animate={{ scale: active !== null ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Explore;
