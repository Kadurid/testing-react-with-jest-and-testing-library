import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("Button has correct initial color", () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to Midnight Blue'
  const elementButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the background color to MediumVioletRed
  expect(elementButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  //click button
  fireEvent.click(elementButton);

  //expect the background color to be Midnight Blue
  expect(elementButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //expect the button text to be "Change to Medium Violet Red"
  expect(elementButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
});

test("Conditions disables button on first click and enables on second click", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  //check checkbox and expects it to be checked
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  //expect button to be disabled
  expect(colorButton).toBeDisabled();

  //enable button again
  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
});

test("Disable button and checks if it is gray and if it return to normal after enabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  //check checkbox and check if button is disabled and gray
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //enable button again and check if the button is enabled and MediumVioletRed again
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Change color of button to Midnight Blue and disables it, enable again and check if it is Midnight Blue", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  //click button to change color to Midnight Blue
  fireEvent.click(colorButton);
  //disable button
  fireEvent.click(checkbox);
  //check if button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  //enable button
  fireEvent.click(checkbox);
  //check if it is Midnight Blue again
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
