import React from 'react';
import { Eyebrow, RevealLines, Rise, Container } from './Editorial';

const steps = [
  {
    stage: 'Define',
    title: 'Understand the problem first',
    text: 'We start by understanding your goals, user requirements, and technical constraints to lay a rock-solid foundation for the project.'
  },
  {
    stage: 'Design',
    title: 'Interfaces people enjoy using',
    text: 'Creating intuitive, pixel-perfect user interfaces and wireframes that guarantee an engaging and accessible user experience.'
  },
  {
    stage: 'Build',
    title: 'Full stack, end to end',
    text: 'Developing scalable frontend architectures and secure backend systems using the latest modern tech stack.'
  },
  {
    stage: 'Launch',
    title: 'Shipped, measured, supported',
    text: 'Rigorous testing, optimization, and seamless deployment to cloud infrastructure, followed by ongoing support.'
  }
];

const Services = () => {
  return (
    <section id="services" className="editorial grain bg-paper pt-32 pb-24 md:pt-44 md:pb-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Sticky intro */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-32">
              <Eyebrow>Process</Eyebrow>
              <RevealLines
                className="t-h2 mt-6"
                label="My structured, creative and technical approach."
                lines={['A structured,', <em key="em">creative approach.</em>]}
              />
              <Rise delay={0.15}>
                <p className="t-body mt-8 max-w-[40ch] text-ink/70">
                  I follow a structured, creative, and highly technical approach to turn your ideas into responsive, full-stack applications built with React, Node.js, and modern databases.
                </p>
              </Rise>
            </div>
          </div>

          {/* Timeline */}
          <ol className="relative md:col-span-7 md:col-start-6 lg:col-start-6">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
            {steps.map((step, i) => (
              <li key={step.stage} className="group relative pb-14 pl-10 last:pb-0 md:pb-20">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-accent bg-paper transition-colors duration-500 group-hover:bg-accent"
                />
                <Rise delay={0.05 * i}>
                  <p className="t-label flex gap-3 text-muted">
                    <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {step.stage}
                  </p>
                  <h3 className="t-h3 mt-4 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                    {step.title}
                  </h3>
                  <p className="t-body mt-4 max-w-[52ch] text-ink/75">{step.text}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
};

export default Services;
