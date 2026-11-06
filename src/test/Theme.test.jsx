import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

describe('Theme Architecture & QA Audit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    // Ensure meta tag exists
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with dark theme by default when no preference is saved', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#080808');
  });

  it('restores saved light theme from localStorage', () => {
    localStorage.setItem('portfolio-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(result.current.isLight).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#F8FAFC');
  });

  it('toggles theme correctly and updates localStorage and meta tag', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#F8FAFC');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#080808');
  });

  it('ThemeToggle component renders proper accessibility labels in both themes', () => {
    const toggleMock = vi.fn();
    const { rerender } = render(<ThemeToggle theme="dark" toggleTheme={toggleMock} />);

    const buttonDark = screen.getByRole('button', { name: /switch to light mode/i });
    expect(buttonDark).toBeInTheDocument();
    fireEvent.click(buttonDark);
    expect(toggleMock).toHaveBeenCalledTimes(1);

    rerender(<ThemeToggle theme="light" toggleTheme={toggleMock} />);
    const buttonLight = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(buttonLight).toBeInTheDocument();
  });

  it('Navbar renders theme switch action accessible on desktop and mobile', () => {
    render(<Navbar />);

    const themeButtons = screen.getAllByRole('button', { name: /switch to light mode/i });
    expect(themeButtons.length).toBeGreaterThanOrEqual(1);

    // Click desktop toggle
    fireEvent.click(themeButtons[0]);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('Footer renders brand and copyright in current theme cleanly', () => {
    render(<Footer />);
    expect(screen.getAllByText(/Satish Kushwaha/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Frontend Engineer/i)).toBeInTheDocument();
  });
});
