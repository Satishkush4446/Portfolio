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
  });
});
