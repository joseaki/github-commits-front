import { render, screen } from "@testing-library/react";
import Button from "./button";
import userEvent from "@testing-library/user-event";

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe("Button", () => {
  it("render text inside the button", () => {
    setup(<Button text="some text" />);
    expect(screen.getByText("some text")).toBeDefined();
  });

  it("call onClick", async () => {
    const onClick = jest.fn();
    const { user } = setup(<Button text="some text" onClick={onClick} />);
    await user.click(screen.getByText("some text"));
    expect(onClick).toHaveBeenCalled();
  });
});
