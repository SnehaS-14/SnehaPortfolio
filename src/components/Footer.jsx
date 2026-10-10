import React from 'react';
import { ArrowUpRight, Container } from './Editorial';

const menu = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Process', id: 'services' },
  { name: 'Work', id: 'projects' },
  { name: 'Contact', id: 'contact' }
];

const connect = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sneha-s138' },
  { name: 'GitHub', href: 'https://github.com/SnehaS-14' },
  { name: 'Email', href: 'mailto:sneha.shanmugam014@gmail.com' }
];

const Footer = () => {
  return (
    <footer className="editorial bg-ink text-paper">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-lg font-semibold tracking-[-0.03em]">Sneha S</p>
            <p className="mt-1 text-sm text-paper/60">
              Full-Stack Engineer — <em>based in</em> Coimbatore, India
            </p>
            <a href="mailto:sneha.shanmugam014@gmail.com" className="link-draw mt-6 inline-block text-sm">
              sneha.shanmugam014@gmail.com
            </a>
          </div>

          <nav className="md:col-span-4 md:col-start-7" aria-label="Footer">
            <p className="t-label mb-4 text-paper/50">Menu</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
              {menu.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-draw">{item.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <p className="t-label mb-4 text-paper/50">Connect</p>
            <ul className="flex flex-col gap-2 text-sm">
              {connect.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5"
                  >
                    <span className="link-draw">{item.name}</span>
                    <ArrowUpRight className="size-3.5 text-paper/50 transition-colors group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big wordmark */}
        <p
          aria-hidden="true"
          className="mt-16 select-none text-[22vw] leading-[0.8] font-semibold tracking-[-0.06em] text-paper md:mt-20 md:text-[18vw]"
        >
          sneha<em>.</em>
        </p>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-paper/15 pt-5 text-xs text-paper/60 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Sneha S. Full-Stack Engineer.</p>
          <a href="#home" className="group inline-flex items-center gap-2 text-paper">
            <span className="link-draw">Back to top</span>
            <span className="grid size-8 place-items-center rounded-full border border-paper/25 transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
