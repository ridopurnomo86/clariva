import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/typography")({
  component: TypographyExample,
});

function TypographyExample() {
  return (
    <div className="mx-auto max-w-3xl p-8 pb-20">
      <div className="mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Joke Tax Chronicles
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
          on his throne. One day, his advisors came to him with a problem: the kingdom was running
          out of money.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            The King's Plan
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The king thought long and hard, and finally came up with{" "}
            <a href="#plan" className="font-medium text-primary underline underline-offset-4">
              a brilliant plan
            </a>
            : he would tax the jokes in the kingdom.
          </p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "After all," he said, "everyone enjoys a good joke, so it's only fair that they should
            pay for the privilege."
          </blockquote>
        </section>

        <section>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The king's subjects were not amused. They grumbled and complained, but the king was
            firm:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>1st level of puns: 5 gold coins</li>
            <li>Knock-knock jokes: 10 gold coins</li>
            <li>Harley Quinn style one-liners: 20 gold coins</li>
          </ul>
        </section>

        <section>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
          </h4>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The kingdom fell into silence. The people were too afraid to tell jokes lest they be
            taxed. The king's advisors warned him that the people were unhappy, but he refused to
            listen.
          </p>
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    King's Treasury
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    People's happiness
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Empty
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Overflowing
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Modest
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Satisfied
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Full
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Ecstatic
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of his ways and
          repealed the joke tax.
        </p>

        <div className="flex flex-col gap-4 pt-8">
          <p className="text-sm text-muted-foreground">
            This is an example from the shadcn ui typography docs.
          </p>
          <p className="text-lg font-semibold">Are you absolutely sure?</p>
          <p className="text-sm font-medium leading-none">Email address</p>
        </div>
      </div>
    </div>
  );
}
