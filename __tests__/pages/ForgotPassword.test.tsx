import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "@/app/forgot-password/page";
import {useForgotPassword} from "@/hooks/useForgotPassword";
import React from "react";

jest.mock("@/hooks/useForgotPassword");
const mockUseForgotPassword = useForgotPassword as jest.MockedFunction<typeof useForgotPassword>;

jest.mock("next/link", () => {
    return ({children, href}: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    );
});

jest.mock("@/components/navbar/Navbar", () => {
    return function MockNavBar() {
        return <nav data-testid="navbar">NavBar</nav>;
    };
});

describe("ForgotPassword - Critical Path Only", () => {
    const mockHandleSubmit = jest.fn((e) => e?.preventDefault?.());
    const mockSetEmail = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseForgotPassword.mockReturnValue({
            email: "you@example.com",
            handleSubmit: mockHandleSubmit,
            setEmail: mockSetEmail,
            loading: false
        });
    });

    it("renders the form with email input and submit button", () => {
        render(<ForgotPassword/>);

        expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /send reset link/i})).toBeInTheDocument();
    });

    it("user can enter email address", async () => {
        const user = userEvent.setup();
        render(<ForgotPassword/>);

        const emailInput = screen.getByPlaceholderText("Enter your email");
        await user.type(emailInput, "user@example.com");

        expect(mockSetEmail).toHaveBeenCalled();
    });

    it("submits form when user clicks submit button", async () => {
        const user = userEvent.setup();
        render(<ForgotPassword/>);

        const emailInput = screen.getByPlaceholderText("Enter your email");
        const submitButton = screen.getByRole("button", {name: /send reset link/i});

        await user.type(emailInput, "user@example.com");


        await user.click(submitButton);


        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it("submits form when user presses Enter in email field", async () => {
        const user = userEvent.setup();
        render(<ForgotPassword/>);

        const emailInput = screen.getByPlaceholderText("Enter your email");

        // Type email and press Enter
        await user.type(emailInput, "user@example.com{Enter}");

        // The handleSubmit from the hook should be called
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it("shows loading state when form is submitting", () => {
        mockUseForgotPassword.mockReturnValue({
            email: "you@example.com",
            handleSubmit: mockHandleSubmit,
            setEmail: mockSetEmail,
            loading: true,
        });

        render(<ForgotPassword/>);

        expect(screen.getByText("Sending...")).toBeInTheDocument();
    });

    it("has back to login link", () => {
        render(<ForgotPassword/>);

        const backLink = screen.getByRole("link", {name: /back to login/i});
        expect(backLink).toHaveAttribute("href", "/login");
    });
});