import { render, screen, waitFor } from "@testing-library/react";
import Options from "../Options";
import { server } from "./../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "./../OrderEntry";

describe("Testing server error response", () => {

  test("alert banner showing when there is no scoops and toppings", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => res(ctx.status(500)))
    );
    render(<OrderEntry />);

    // const alerts = await screen.findAllByRole("alert");
    // expect(alerts).toHaveLength(2);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

});
