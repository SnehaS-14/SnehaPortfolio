import React from 'react';
import { Eyebrow, RevealLines, Rise, ArrowUpRight, Container } from './Editorial';
import { projects } from '../data/projects';

const pad = (n) => String(n).padStart(2, '0');

const ProjectRow = ({ project }) => {
  const Row = project.link ? 'a' : 'div';
  const linkProps = project.link
    ? { href: `https://${project.link}`, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <li className="border-t border-ink transition-opacity duration-500 group-hover/list:opacity-30 hover:!opacity-100 focus-within:!opacity-100">
      <Row
        {...linkProps}
        className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-5 py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,20rem)_auto] md:gap-x-8 md:py-9"
      >
        <span className="t-label col-span-2 text-muted transition-colors md:col-span-1 md:pt-[0.9em] duration-500 group-hover:text-accent">
          {pad(project.number)}
        </span>

        {/* Title + description */}
        <div className="min-w-0">
          <h3 className="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="t-label mt-4 text-muted">{project.subtitle}</p>
          )}
          <p className="t-body mt-4 max-w-[60ch] text-justify hyphens-auto text-ink/70 md:text-left">{project.description}</p>
        </div>

        {/* Arrow (mobile sits in the third column, desktop in the fourth) */}
        <span className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:order-last">
          <ArrowUpRight />
        </span>

        {/* Stack + live link */}
        <div className="col-span-2 col-start-1 flex min-w-0 flex-col gap-5 md:col-span-1 md:col-start-auto md:pt-2">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[0.72rem] tracking-[0.04em] text-ink/80"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          {project.link && (
            <span className="flex min-w-0 items-center gap-2 text-sm font-medium" title={project.link}>
              <span className="link-draw truncate pb-0.5">{project.link}</span>
            </span>
          )}
        </div>
      </Row>
    </li>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="editorial grain bg-paper pt-32 pb-24 md:pt-44 md:pb-32">
      <Container>
        <Eyebrow>Work</Eyebrow>
        <RevealLines
          as="h2"
          className="t-h1 mt-6 max-w-[14ch] md:mt-8"
          label="Selected work."
          lines={[<React.Fragment key="l">Selected <em>work.</em></React.Fragment>]}
        />

        <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12">
          <Rise className="order-2 md:order-1 md:col-span-4">
            <p className="t-label text-muted">{pad(projects.length)} projects, each with a live link</p>
          </Rise>
          <Rise delay={0.1} className="order-1 md:order-2 md:col-span-6 md:col-start-7">
            <p className="t-lead text-ink/85">
              Full-stack applications built with React, Node.js, and modern databases — each one owned end to end, from design to deployment.
            </p>
          </Rise>
        </div>

        <ul className="group/list mt-16 border-b border-ink md:mt-24">
          {projects.map((project) => (
            <ProjectRow key={project.number} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Projects;
