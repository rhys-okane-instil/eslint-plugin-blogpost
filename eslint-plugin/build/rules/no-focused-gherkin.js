"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixNoFocusedGherkin = exports.noFocusedGherkin = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.noFocusedGherkin = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        docs: {
            description: "Prevent commits that accidentally focus acceptance tests."
        },
        messages: {
            focused: "This test is focused with '.only'. This must be removed before commit"
        },
        type: "suggestion",
        schema: [],
        fixable: "code"
    },
    defaultOptions: [],
    create(context) {
        return {
            ExpressionStatement(node) {
                if (node.expression.type !== utils_1.AST_NODE_TYPES.CallExpression)
                    return;
                if (node.expression.callee.type !== utils_1.AST_NODE_TYPES.MemberExpression)
                    return;
                if (node.expression.callee.object.type !== utils_1.AST_NODE_TYPES.Identifier)
                    return;
                if (!["given", "when", "then"].includes(node.expression.callee.object.name))
                    return;
                if (node.expression.callee.property.type !== utils_1.AST_NODE_TYPES.Identifier)
                    return;
                if (node.expression.callee.property.name !== "only")
                    return;
                // Extract callee to maintain types in the callback
                const callee = node.expression.callee;
                context.report({
                    messageId: "focused",
                    node: callee,
                    fix: (fixer) => (0, exports.fixNoFocusedGherkin)(fixer, callee)
                });
            }
        };
    },
});
const fixNoFocusedGherkin = (fixer, callee) => {
    // First item in the range array is the position of the first character of "when" (w), so we minus one to include the dot
    const startingCharacter = callee.property.range[0] - 1;
    // Second item in the range array is the position of the final character of "when" (n)
    const endingCharacter = callee.property.range[1];
    return {
        range: [startingCharacter, endingCharacter],
        text: ""
    };
};
exports.fixNoFocusedGherkin = fixNoFocusedGherkin;
