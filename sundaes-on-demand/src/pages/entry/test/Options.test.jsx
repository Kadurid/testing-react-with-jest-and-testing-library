import { render, screen } from '@testing-library/react'
import Options from '../Options';

describe("Testes de Options", () => {

  test("displays image for each scoop from server", () => {
    render(<Options optionType="scoops"/>)

    //find images
    const scoopImages = screen.getAllByRole("img", {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
  })

});