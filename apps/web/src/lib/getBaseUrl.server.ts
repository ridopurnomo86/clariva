import { getRequest } from "@tanstack/react-start/server";

export function getBaseUrl(): string {
  const request = getRequest();
  if (request) {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  }
  const fromEnv = typeof process !== "undefined" && process.env ? process.env.PORT : undefined;
  const port = fromEnv && fromEnv.length > 0 ? fromEnv : "3000";
  return `http://localhost:${port}`;
}
