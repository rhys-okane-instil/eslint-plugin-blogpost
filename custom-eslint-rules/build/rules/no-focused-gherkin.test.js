"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const target = __importStar(require("./no-focused-gherkin"));
// Creation of a RuleTester
const ruleTester = new rule_tester_1.RuleTester({
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
            errors: [{ messageId: "focused" }],
        },
        {
            code: `
        given("", () => {
          when.only()
        })
      `,
            errors: [{ messageId: "focused" }]
        }
    ]
});
