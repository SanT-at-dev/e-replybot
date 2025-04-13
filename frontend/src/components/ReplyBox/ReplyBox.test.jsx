import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReplyBox from "./ReplyBox";

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("ReplyBox component", () => {
  const replyText = "This is your AI-generated reply.";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading text", () => {
    render(<ReplyBox generatedReply={replyText} />);
    expect(
      screen.getByRole("heading", { name: /your ai-generated reply/i })
    ).toBeInTheDocument();
  });

  it("renders TextField with the generated reply", () => {
    render(<ReplyBox generatedReply={replyText} />);
    const textField = screen.getByDisplayValue(replyText);
    expect(textField).toBeInTheDocument();
  });

  it("TextField is read-only", () => {
    render(<ReplyBox generatedReply={replyText} />);
    const textField = screen.getByDisplayValue(replyText);
    expect(textField).toHaveAttribute("readonly");
  });

  it('renders "Copy to Clipboard" button', () => {
    render(<ReplyBox generatedReply={replyText} />);
    expect(
      screen.getByRole("button", { name: /copy to clipboard/i })
    ).toBeInTheDocument();
  });

  it("copies reply to clipboard on button click", () => {
    render(<ReplyBox generatedReply={replyText} />);
    const button = screen.getByRole("button", { name: /copy to clipboard/i });
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(replyText);
  });
});
