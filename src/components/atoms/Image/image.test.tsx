import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Image from "./image";
import userEvent from "@testing-library/user-event";

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe("Image", () => {
  it("render a default image", () => {
    const originalImage = "http://original.com/";
    const fallbackImage = "http://fallback.com/";
    setup(
      <Image
        unoptimized
        src={originalImage}
        fallback={fallbackImage}
        alt="image"
        width={10}
        height={10}
      />
    );
    const image = screen.getByAltText<HTMLImageElement>("image");
    expect(image).toBeDefined();
    expect(image.src).toBe(originalImage);
  });

  it("render a fallback image", () => {
    const originalImage = "http://original.com/";
    const fallbackImage = "http://fallback.com/";

    setup(
      <Image
        unoptimized
        src={originalImage}
        fallback={fallbackImage}
        alt="image"
        width={10}
        height={10}
      />
    );
    fireEvent.error(screen.getByAltText("image"));
    const image = screen.getByAltText<HTMLImageElement>("image");
    expect(image).toBeDefined();
    waitFor(() => expect(image.src).toBe(fallbackImage));
  });
});
