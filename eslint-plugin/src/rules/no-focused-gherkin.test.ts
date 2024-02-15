import {RuleTester} from "@typescript-eslint/rule-tester";
import * as target from "./no-focused-gherkin";

// Creation of a RuleTester
const ruleTester = new RuleTester({
  // Resolves the direct path to the package in node_modules
  parser: require.resolve("@typescript-eslint/parser")
});

ruleTester.run("no-focused-gherkin", target.noFocusedGherkin, {
  valid: [
    'given("", () => {})',
    "console.only('hello')"
  ],
  invalid: [
    {
      code: 'given.only("", () => {})',
      errors: [{messageId: "focused"}],
      
    },
    {
      code: `
        given("", () => {
          when.only()
        })
      `,
      errors: [{messageId: "focused"}]
    }
  ]
});