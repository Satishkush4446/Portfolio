import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../sections/Contact';

describe('Contact Section & Form', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders contact actions and quick message form inputs', () => {
    render(<Contact />);

    expect(screen.getByText('Send Direct Email')).toBeInTheDocument();
    expect(screen.getByText(/satishkush4446@outlook.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message \/ Project Details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('validates empty name and displays error message', () => {
    render(<Contact />);

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
  });

  it('validates invalid email format', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Your Email/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('validates message length minimum', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Your Email/i);
    const messageInput = screen.getByLabelText(/Message \/ Project Details/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'alex@company.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hi' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please write a message of at least 10 characters.')).toBeInTheDocument();
  });

  it('handles missing access key gracefully with instructional notice', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Your Email/i);
    const messageInput = screen.getByLabelText(/Message \/ Project Details/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'alex@company.com' } });
    fireEvent.change(messageInput, { target: { value: 'We are interested in discussing an enterprise web project.' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Delivery setup notice/i)).toBeInTheDocument();
  });

  it('handles successful API delivery when configured and valid', async () => {
    // Provide mock access key
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test_key_12345');

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Delivered' }),
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Your Email/i);
    const messageInput = screen.getByLabelText(/Message \/ Project Details/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'alex@company.com' } });
    fireEvent.change(messageInput, { target: { value: 'We would love to discuss a frontend role.' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
      expect(screen.getByText(/transmitted successfully/i)).toBeInTheDocument();
    });

    vi.unstubAllEnvs();
  });
});
