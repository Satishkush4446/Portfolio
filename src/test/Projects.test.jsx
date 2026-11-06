import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from '../sections/Projects';

describe('Projects Section & Modal', () => {
  it('renders all 4 projects and filter pills', () => {
    render(<Projects />);

    expect(screen.getByText('All (4 Projects)')).toBeInTheDocument();
    expect(screen.getByText('Nonprofit / NGO')).toBeInTheDocument();
    expect(screen.getByText('Corporate & Lab Testing')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Dharti Maa Trust/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Spectra Testing Labs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Swachhand Academy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /50\+ Website Migrations/i })).toBeInTheDocument();
  });

  it('filters projects when a category pill is clicked', () => {
    render(<Projects />);

    const nonprofitBtn = screen.getByText('Nonprofit / NGO');
    fireEvent.click(nonprofitBtn);

    expect(screen.getByRole('heading', { name: /Dharti Maa Trust/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Spectra Testing Labs/i })).not.toBeInTheDocument();
  });

  it('opens modal on card click and closes on close button', () => {
    render(<Projects />);

    const card = screen.getByLabelText(/View case study for Dharti Maa Trust/i);
    fireEvent.click(card);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Project Overview')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close case study modal');
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render broken live demo link for Project 4 (migrations study)', () => {
    render(<Projects />);

    const migrationsCard = screen.getByLabelText(/View case study for 50\+ Website Migrations/i);
    fireEvent.click(migrationsCard);

    // Verify dialog opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Verify it does NOT render broken live website link
    const brokenLink = screen.queryByRole('link', { name: /Visit Live Website/i });
    expect(brokenLink).toBeNull();

    // Verify aggregate study badge is displayed
    expect(screen.getByText(/Multi-Site Enterprise Study/i)).toBeInTheDocument();
  });
});
