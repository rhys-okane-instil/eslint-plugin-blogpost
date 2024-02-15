import {noFocusedGherkin} from "./rules/no-focused-gherkin";
import type {AnyRuleModule} from "@typescript-eslint/utils/ts-eslint";

export const rules = {
  "no-focused-gherkin": noFocusedGherkin
} satisfies Record<string, AnyRuleModule>;