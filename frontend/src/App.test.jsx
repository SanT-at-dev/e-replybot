import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { generateEmailReply } from "./api/email";

// Mocking the API function to simulate its response
jest.mock("./api/email", () => ({
  generateEmailReply: jest.fn(),
}));

describe("App Component", () => {
  it("renders the initial UI", () => {
    render(<App />);

    // Check if the title renders
    expect(screen.getByText(/email reply generator/i)).toBeInTheDocument();

    // Check if EmailForm is rendered
    expect(
      screen.getByLabelText(/paste the original email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /generate reply/i })
    ).toBeInTheDocument();
  });

  it("calls generateEmailReply on form submission", async () => {
    generateEmailReply.mockResolvedValue("This is the generated reply.");

    render(<App />);

    // Simulate typing in the input fields
    fireEvent.change(screen.getByLabelText(/paste the original email/i), {
      target: { value: "Hello, I need help with my order." },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /generate reply/i }));

    // Wait for the response to be shown
    await waitFor(() => screen.getByText(/your ai-generated reply/i));

    // Check if the generated reply is shown
    expect(
      screen.getByText("This is the generated reply.")
    ).toBeInTheDocument();
  });

  it("displays an error message when the API call fails", async () => {
    generateEmailReply.mockRejectedValue(new Error("API error"));

    render(<App />);

    // Simulate form submission with valid inputs
    fireEvent.change(screen.getByLabelText(/paste the original email/i), {
      target: { value: "Hello, I need help with my order." },
    });

    fireEvent.click(screen.getByRole("button", { name: /generate reply/i }));

    // Wait for the error message
    await waitFor(() => screen.getByText(/email generation failed/i));

    // Check if the error message is displayed
    expect(screen.getByText(/email generation failed/i)).toBeInTheDocument();
  });

  it("displays a loading state while the API is called", async () => {
    generateEmailReply.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve("Generated Reply"), 1000)
        )
    );

    render(<App />);

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /generate reply/i }));
  });
});
