import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event'

describe("Testes para testar comportamento do button quanto a checkbox", () => {
  test("Expect button to be disabled at first", () => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });

    expect(buttonElement).toBeDisabled();
  });

  test("Checking Checkbox enables button", async() => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });
    const checkboxElement = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();

    await userEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();

    expect(buttonElement).toBeEnabled();
  });

  test("Unchecking checkbox disables button", async() => {
    render(<SummaryForm />);
    const buttonElement = screen.getByRole("button", {
      name: "Confirm order",
    });
    const checkboxElement = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();

    await userEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();

    expect(buttonElement).toBeEnabled();

    await userEvent.click(checkboxElement);

    expect(checkboxElement).not.toBeChecked();

    expect(buttonElement).toBeDisabled();
  });

  test("popover is appearing", async() => {
    render(<SummaryForm/>);
    //popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    //popover appears upon mouseover of checkbox label
    const termsAndCondition = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndCondition);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouse out
    userEvent.unhover(termsAndCondition);
    // const disappearedPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i) )

    // expect(disappearedPopover).not.toBeInTheDocument();
  });
});
