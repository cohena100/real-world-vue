import { rest } from "msw";
import { events as mockEvents } from "../../db.json";

export const handlers = [
  rest.get(/\/events/, (req, res, ctx) => {
    const data = mockEvents;
    return res(ctx.status(200), ctx.json(data));
  }),
];
