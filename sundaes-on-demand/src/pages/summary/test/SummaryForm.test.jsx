import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Testes para testar comportamento do button quanto a checkbox", () => {
  test("Expect button to be disabled at first", () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });

    expect(buttonElement).toBeDisabled();
  });

  test("Checking Checkbox enables button", () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });
    const checkboxElement = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();

    fireEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();

    expect(buttonElement).toBeEnabled();
  });

  test("Unchecking checkbox disables button", () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });
    const checkboxElement = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();

    fireEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();

    expect(buttonElement).toBeEnabled();

    fireEvent.click(checkboxElement);

    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();
  });
});
