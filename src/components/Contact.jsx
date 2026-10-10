import React, { useEffect, useState } from 'react';
import { Eyebrow, RevealLines, Rise, ArrowUpRight, Container } from './Editorial';

const EMAIL = 'sneha.shanmugam014@gmail.com';

const socials = [
  { name: 'LinkedIn', handle: 'in/sneha-s138', href: 'https://www.linkedin.com/in/sneha-s138' },
  { name: 'GitHub', handle: '@SnehaS-14', href: 'https://github.com/SnehaS-14' }
];

const formatIST = () =>
  new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }).format(new Date());

const inputClass =
  'w-full bg-transparent border-b border-ink/25 pb-3 text-lg text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors rounded-none';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState(formatIST);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(formatIST()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="editorial grain bg-paper pt-32 pb-24 md:pt-44 md:pb-32">
      <Container>
        <Eyebrow>Contact</Eyebrow>
        <RevealLines
          className="t-h1 mt-6 md:mt-8"
          label="Let's work together."
          lines={["Let's work", <em key="em">together.</em>]}
          indentLast
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Left: intro + details */}
          <div className="lg:col-span-5">
            <Rise>
              <p className="t-lead max-w-[30ch] text-ink/85">
                Have a product, a problem or an idea you'd like to build? Send me a message — I'd love to hear about it.
              </p>
            </Rise>
            <Rise delay={0.1} className="mt-12 flex flex-col gap-6">
              {[
                ['Based in', 'Coimbatore, India'],
                ['Role', 'Full-Stack Engineer'],
                ['Local time', `${localTime} IST`]
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-2">
                  <p className="t-label text-muted">{label}</p>
                  <p className="text-lg tabular-nums">{value}</p>
                </div>
              ))}
            </Rise>
          </div>

          {/* Right: email card, socials, form */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <Rise className="rounded-[1.25rem] bg-ink p-6 text-paper md:p-10">
              <p className="t-label text-paper/60">Email — the best way to reach me</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-6 block text-[clamp(1.35rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-[-0.04em] [overflow-wrap:anywhere] transition-colors duration-300 hover:text-accent"
              >
                {EMAIL}
              </a>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
                >
                  Write an email
                  <ArrowUpRight />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-sm transition-colors hover:border-paper"
                >
                  {copied ? 'Copied!' : 'Copy'}
                  <span className="sr-only">email address</span>
                </button>
              </div>
            </Rise>

            <ul className="grid gap-4 sm:grid-cols-2">
              {socials.map((social, i) => (
                <li key={social.name}>
                  <Rise delay={0.05 * (i + 1)} className="h-full">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col gap-10 rounded-[1.25rem] bg-surface p-6 transition-colors duration-500 hover:bg-surface-strong md:p-8"
                    >
                      <span className="flex items-center justify-between">
                        <span className="t-label text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="grid size-10 place-items-center rounded-full bg-paper transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
                          <ArrowUpRight />
                        </span>
                      </span>
                      <span>
                        <span className="block text-2xl font-medium tracking-[-0.03em]">{social.name}</span>
                        <span className="mt-1 block text-sm text-muted">{social.handle}</span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </Rise>
                </li>
              ))}
            </ul>

            <Rise delay={0.1} className="rounded-[1.25rem] bg-surface p-6 md:p-10">
              <p className="t-label text-muted">Or send a message</p>
              <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="grid gap-8 sm:grid-cols-2">
                  <input type="text" id="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required className={inputClass} />
                  <input type="text" id="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required className={inputClass} />
                </div>
                <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={inputClass} />
                <textarea id="message" placeholder="Tell me about your project" value={formData.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} />

                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 text-base font-medium text-paper disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
                    <span className="relative">{isLoading ? 'Sending...' : 'Send message'}</span>
                    {!isLoading && <ArrowUpRight className="relative size-4" />}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-sm font-medium text-green-700">✓ Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-sm font-medium text-accent">✗ Failed to send message. Please try again.</p>
                  )}
                </div>
              </form>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
