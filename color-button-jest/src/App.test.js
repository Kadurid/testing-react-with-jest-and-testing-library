import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('Button has correct initial color', () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to blue'
  const elementButton = screen.getByRole('button', {name: "Change to blue"});

  //expect the background color to red
  expect(elementButton).toHaveStyle({ backgroundColor: 'red' });

  //click button
  fireEvent.click(elementButton);

  //expect the background color to be blue
  expect(elementButton).toHaveStyle({ backgroundColor: "blue"})

  //expect the button text to be "Change to red"
  expect(elementButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />)

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
  
})

test("Conditions disables button on first click and enables on second click", () => {
  render(<App/>)
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button"});

  //check checkbox and expects it to be checked
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  //expect button to be disabled
  expect(colorButton).toBeDisabled();

  //enable button again
  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
})

test("Disable button and checks if it is gray and if it return to normal after enabled", () => {
  render(<App/>)
  const colorButton = screen.getByRole("button", {name: "Change to blue"});
  const checkbox = screen.getByRole("checkbox", {name: "Disable Button"});

  //check checkbox and check if button is disabled and gray
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: "gray"});

  //enable button again and check if the button is enabled and red again
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: "red" });
})

test("Change color of button to blue and disables it, enable again and check if it is blue", () => {
  render(<App/>)
  const colorButton = screen.getByRole("button", {name: "Change to blue"});
  const checkbox = screen.getByRole("checkbox", {name: "Disable Button"});

  //click button to change color to blue
  fireEvent.click(colorButton);
  //disable button
  fireEvent.click(checkbox);
  //check if button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: "gray"});
  //enable button
  fireEvent.click(checkbox);
  //check if it is blue again
  expect(colorButton).toHaveStyle({ backgroundColor: "blue"});

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
