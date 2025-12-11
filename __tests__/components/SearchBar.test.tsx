import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";

describe("SearchBar", () => {
    const mockOnSearchChange = jest.fn();
    const mockOnSearchSubmit = jest.fn();
    const mockOnClear = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders the search input and button", () => {
            render(
                <SearchBar
                    searchTerm=""
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            expect(screen.getByRole("textbox")).toBeInTheDocument();
            expect(screen.getByRole("button", {name: /search/i})).toBeInTheDocument();
        });

        it("displays the correct placeholder text", () => {
            render(
                <SearchBar
                    searchTerm=""
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                    placeholder="Custom placeholder"
                />
            );

            expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument();
        });

        it("displays the current search term value", () => {
            render(
                <SearchBar
                    searchTerm="test query"
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            expect(screen.getByRole("textbox")).toHaveValue("test query");
        });
    });

    describe("Clear Button", () => {
        it("does not show clear button when search term is empty", () => {
            render(
                <SearchBar
                    searchTerm=""
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            expect(screen.queryByTestId("clear-btn")).not.toBeInTheDocument();
        });

        it("shows clear button when search term has value", () => {
            render(
                <SearchBar
                    searchTerm="search query"
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            expect(screen.getByTestId("clear-btn")).toBeInTheDocument();
        });

        it("calls onClear when clear button is clicked", async () => {
            const user = userEvent.setup();

            render(
                <SearchBar
                    searchTerm="search query"
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                    onClear={mockOnClear}
                />
            );

            const clearButton = screen.getByTestId("clear-btn");
            await user.click(clearButton);

            expect(mockOnClear).toHaveBeenCalledTimes(1);
        });
    });

    describe("User Interactions", () => {

        it("calls onSearchSubmit when Enter key is pressed", async () => {
            const user = userEvent.setup();

            render(
                <SearchBar
                    searchTerm=""
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            const input = screen.getByRole("textbox");
            await user.click(input);
            await user.keyboard("{Enter}");

            expect(mockOnSearchSubmit).toHaveBeenCalledTimes(1);
        });

        it("calls onSearchSubmit when search button is clicked", async () => {
            const user = userEvent.setup();

            render(
                <SearchBar
                    searchTerm=""
                    onSearchChange={mockOnSearchChange}
                    onSearchSubmit={mockOnSearchSubmit}
                />
            );

            const searchButton = screen.getByRole("button", {name: /search/i});
            await user.click(searchButton);

            expect(mockOnSearchSubmit).toHaveBeenCalledTimes(1);
        });
    });
})