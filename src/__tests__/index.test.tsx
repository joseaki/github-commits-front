import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import { RepoProvider } from "@/hooks/useRepo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function setup() {
  const user = userEvent.setup();
  render(
    <QueryClientProvider client={queryClient}>
      <RepoProvider>
        <Home />
      </RepoProvider>
    </QueryClientProvider>
  );
  return { user };
}

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
jest.mock("../services/github.service");

describe("Home", () => {
  it("renders a search input", () => {
    const { user } = setup();
    const searchInput = screen.getByRole("textbox", {
      name: /search/i,
    });
    const searchButton = screen.getByRole("button", {
      name: /search/i,
    });
    expect(searchInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });

  it("updates the text input", () => {
    const { user } = setup();
    const searchInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /search/i,
    });

    fireEvent.change(searchInput, { target: { value: "new repo" } });
    expect(searchInput.value).toBe("new repo");
  });

  it("search the repo", () => {
    const { user } = setup();
    const searchInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /search/i,
    });
    const searchButton = screen.getByRole("button", {
      name: /search/i,
    });
    const table = screen.getByRole<HTMLTableElement>("table");

    fireEvent.change(searchInput, { target: { value: "new repo" } });
    fireEvent.click(searchButton);
    expect(table.children.length).toBe(2);
  });

  it("shows the loading indicator", () => {
    const { user } = setup();
    const searchInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /search/i,
    });
    const searchButton = screen.getByRole("button", {
      name: /search/i,
    });
    fireEvent.change(searchInput, { target: { value: "new repo" } });
    fireEvent.click(searchButton);
    const loadingIndicator = screen.getByRole("progressbar");
    expect(loadingIndicator).toBeDefined();
  });
});
