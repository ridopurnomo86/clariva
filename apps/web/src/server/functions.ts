/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const handleTRPC = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      path: z.string(),
      input: z.unknown(),
    }),
  )
  .handler(async ({ data }) => {
    // Dynamically import the router and caller factory only on the server
    const { createCaller } = await import("./trpc");
    
    const { path, input } = data;
    const caller = createCaller({});
    const pathParts = path.split(".");
    
    let target: any = caller;

    for (const part of pathParts) {
      target = target[part];
    }

    return await target(input);
  });
