import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

describe("Testes de Options", () => {
  test("displays image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    //find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("displays image for each topping from server", async () => {
    render(<Options optionType="toppings" />);

    //find images
    const toppingsImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingsImages).toHaveLength(2);

    //confirm alt text of images
    const altText = toppingsImages.map((element) => element.alt);
    expect(altText).toEqual(["M&Ms topping", "Hot fudge topping"]);
  });
});
