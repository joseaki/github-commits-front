import { render, screen } from "@testing-library/react";
import ErrorMessage from "./errorMessage";
import userEvent from "@testing-library/user-event";

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe("Error Message", () => {
  it("render the error message", () => {
    setup(<ErrorMessage error="some text" />);
    expect(screen.getByText("some text")).toBeDefined();
  });
});
