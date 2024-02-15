/**
 * Acceptance test cucumber syntax to jest describe converters.
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const given: jest.Describe = (blockName: BlockName, blockFn: BlockFn): void => describe(`given ${blockName}`, blockFn);
// @ts-ignore
given.only = (blockName: BlockName, blockFn: BlockFn): void => describe.only(`given ${blockName}`, blockFn);

// Add ".only" here to see the rule in action
given("name", () => {

});