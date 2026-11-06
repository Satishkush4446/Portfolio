import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from '../sections/Skills';

describe('Skills Section', () => {
  it('renders all 5 skill categories without falling back incorrectly', () => {
    render(<Skills />);

    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('CMS & Website Platforms')).toBeInTheDocument();
    expect(screen.getByText('Performance & SEO')).toBeInTheDocument();
    expect(screen.getByText('UI/UX & Design')).toBeInTheDocument();
    expect(screen.getByText('Developer Tools & DevOps')).toBeInTheDocument();
  });

  it('renders key technical skills within categories', () => {
    render(<Skills />);

    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('WordPress')).toBeInTheDocument();
    expect(screen.getByText('Core Web Vitals')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });
});
