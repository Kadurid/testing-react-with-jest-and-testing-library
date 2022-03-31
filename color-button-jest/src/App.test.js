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

// test("button turns blue when clicked", () => {
//   render(<App/>);

//   const colorButton = screen.getByRole('button', {name: "Change to blue"});


// })
