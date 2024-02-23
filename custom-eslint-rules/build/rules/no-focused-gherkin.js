"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noFocusedGherkin = void 0;
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
                });
            }
        };
    },
});
