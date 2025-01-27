import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.dsa.com/api/v3/ping", async () => {
    return HttpResponse.json("Server is working.");
  }),
];
