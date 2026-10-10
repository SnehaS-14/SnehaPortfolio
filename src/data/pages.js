import { projects } from './projects';

// Pages reachable from the Explore list. `id` doubles as the URL hash
// (#about, #services, ...) so existing navbar, hero and footer links open them.
export const pages = [
  { id: 'about', name: 'About', blurb: 'Who I am and the stack I work with.' },
  { id: 'services', name: 'Process', blurb: 'How I take an idea from brief to launch.' },
  { id: 'projects', name: 'Work', blurb: `${projects.length} projects — AI tools, CRMs, e-commerce and more.` },
  { id: 'contact', name: 'Contact', blurb: "Have an idea worth building? Let's talk." }
];
