import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders brand name and navigation items', () => {
    render(<Navbar />);

    expect(screen.getByLabelText('Satish Kushwaha Home')).toBeInTheDocument();
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Skills')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('renders resume download link with proper accessible label and download attribute', () => {
    render(<Navbar />);

    const resumeLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(1);
    expect(resumeLinks[0]).toHaveAttribute('download', 'Satish_Kushwaha_Resume.pdf');
  });

  it('toggles mobile navigation drawer when menu button is clicked', () => {
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText('Open Menu');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText('Close Menu')).toBeInTheDocument();

    // Closing on Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();
  });

  it('closes mobile drawer when a mobile nav link is clicked', () => {
    render(<Navbar />);

    const openBtn = screen.getByLabelText('Open Menu');
    fireEvent.click(openBtn);
    expect(screen.getByLabelText('Close Menu')).toBeInTheDocument();

    const mobileProjectLink = screen.getAllByRole('link', { name: 'Projects' }).find((link) =>
      link.classList.contains('mobile-nav-item')
    );
    expect(mobileProjectLink).toBeInTheDocument();

    fireEvent.click(mobileProjectLink);
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();
  });

  it('renders top social links (GitHub & LinkedIn) with correct target and rel attributes', () => {
    render(<Navbar />);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
    expect(githubLinks[0]).toHaveAttribute('target', '_blank');
    expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    expect(linkedinLinks.length).toBeGreaterThanOrEqual(1);
    expect(linkedinLinks[0]).toHaveAttribute('target', '_blank');
    expect(linkedinLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('toggles theme between dark and light mode and sets data-theme on html root', () => {
    render(<Navbar />);

    // Default theme is dark
    const themeBtn = screen.getByRole('button', { name: /switch to light mode/i });
    expect(themeBtn).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Click to toggle to light mode
    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();

    // Click again to toggle back to dark mode
    const darkBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(darkBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
