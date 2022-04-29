import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "./../Options";
import OrderEntry from './../OrderEntry';

describe("Testando updates de valor e o total", () => {
  test("update scoop subtotal when scoops change", async () => {
    render(<Options optionType="scoops" />);

    //make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

    expect(scoopsSubtotal).toHaveTextContent("0.00");
    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");

    expect(scoopsSubtotal).toHaveTextContent("2.00");
    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, "2");

    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });

  test("update toppings subtotal when checkmark is check", async() => {
    render(<Options optionType="toppings"/>);
    //make sure starts with 0.00
    const toppingSubtotal = screen.getByText("Toppings total: $", {exact: false});
    expect(toppingSubtotal).toHaveTextContent("0.00");
    //check one topping and see subtotal
    const hotFudgeCheckmark = await screen.findByRole("checkbox", { name: "Hot fudge"});
    await userEvent.click(hotFudgeCheckmark);
    expect(hotFudgeCheckmark).toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("1.50");
    //check two toppings and see subtotal
    const mmCheckmark = await screen.findByRole("checkbox", {
      name: "M&Ms"
    });
    await userEvent.click(mmCheckmark);
    expect(mmCheckmark).toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("3.00");
    //uncheck one topping and see subtotal
    await userEvent.click(hotFudgeCheckmark);
    expect(hotFudgeCheckmark).not.toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("1.50");

  });

  describe("grand total updates", () => {

    test("grand total starts at $0.00", async() => {
      render(<OrderEntry/>)
      const grandTotal = await screen.findByText("Grand total: $", {exact: false});
      expect(grandTotal).toHaveTextContent("0.00");
    });

    test("grand total updates properly if scoop is added first", async() => {
      render(<OrderEntry/>)
      const grandTotal = await screen.findByText("Grand total: $", {exact: false})

      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      await userEvent.clear(vanillaInput);
      await userEvent.type(vanillaInput, "1");
      expect(grandTotal).toHaveTextContent("2.00")

      const hotFudgeCheckmark = await screen.findByRole("checkbox", { name: "Hot fudge"});
      await userEvent.click(hotFudgeCheckmark);
      expect(hotFudgeCheckmark).toBeChecked();

      expect(grandTotal).toHaveTextContent("3.50");
    });

    test("grand total updates properly if topping is added first", async() => {
      render(<OrderEntry/>)
      const grandTotal = await screen.findByText("Grand total: $", {exact: false})
      const hotFudgeCheckmark = await screen.findByRole("checkbox", { name: "Hot fudge"});
      await userEvent.click(hotFudgeCheckmark);
      expect(hotFudgeCheckmark).toBeChecked();
      expect(grandTotal).toHaveTextContent("1.50")

      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
  
      await userEvent.clear(vanillaInput);
      await userEvent.type(vanillaInput, "1");
      expect(grandTotal).toHaveTextContent("3.50");


    });

    test("grand total updates properly if an topping is removed", async() => {
      render(<OrderEntry/>)
      const grandTotal = await screen.findByText("Grand total: $", {exact: false})
      const hotFudgeCheckmark = await screen.findByRole("checkbox", { name: "Hot fudge"});
      await userEvent.click(hotFudgeCheckmark);
      expect(hotFudgeCheckmark).toBeChecked();
      expect(grandTotal).toHaveTextContent("1.50");

      await userEvent.click(hotFudgeCheckmark);
      expect(grandTotal).toHaveTextContent("0.00")
    });

    test("grand total updates properly if an scoop is removed", async() => {
      render(<OrderEntry/>)
      const grandTotal = await screen.findByText("Grand total: $", {exact: false})

      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      await userEvent.clear(vanillaInput);
      await userEvent.type(vanillaInput, "1");
      expect(grandTotal).toHaveTextContent("2.00");

      await userEvent.clear(vanillaInput);
      await userEvent.type(vanillaInput,"0");
      expect(grandTotal).toHaveTextContent("0.00");
    })

  });
  

});
