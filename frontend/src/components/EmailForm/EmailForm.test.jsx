import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailForm from './EmailForm';

const mockProps = {
  emailContent: 'Sample email content',
  setEmailContent: jest.fn(),
  tone: '',
  setTone: jest.fn(),
  loading: false,
  handleSubmit: jest.fn(),
};

describe('EmailForm component', () => {
  it('renders text field and button', () => {
    render(<EmailForm {...mockProps} />);
    expect(screen.getByLabelText(/paste the original email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate reply/i })).toBeInTheDocument();
  });

  it('calls setEmailContent on text input change', () => {
    render(<EmailForm {...mockProps} />);
    const input = screen.getByLabelText(/paste the original email/i);
    fireEvent.change(input, { target: { value: 'New email content' } });
    expect(mockProps.setEmailContent).toHaveBeenCalledWith('New email content');
  });

  it('calls handleSubmit on button click', () => {
    render(<EmailForm {...mockProps} />);
    const button = screen.getByRole('button', { name: /generate reply/i });
    fireEvent.click(button);
    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
});
