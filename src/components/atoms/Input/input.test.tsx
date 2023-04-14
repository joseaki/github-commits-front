import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./input";
import userEvent from "@testing-library/user-event";

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe("Input", () => {
  it("render an input field", () => {
    setup(<Input label="label" />);
    const input = screen.getByLabelText<HTMLImageElement>("label");
    expect(input).toBeDefined();
  });

  it("changes the value of the input field", () => {
    setup(<Input label="label" />);
    const input = screen.getByLabelText<HTMLInputElement>("label");
    fireEvent.change(input, { target: { value: "value" } });
    expect(input.value).toBe("value");
  });
});
