import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

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
  const checkbox = screen.getByRole("checkbox");

  //check checkbox and expects it to be checked
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  //expect button to be disabled
  expect(colorButton).toBeDisabled();

  //enable button again
  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
})
