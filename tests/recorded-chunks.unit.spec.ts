import { test, expect } from "@playwright/test";
import {
  assembleRecordedContext,
  recordedChunks,
} from "../src/components/town/recordedChunks";

test("recorded budget selection skips a large chunk without truncating later functions", () => {
  const tight = assembleRecordedContext(200);
  expect(
    tight.decisions.filter((chunk) => chunk.kept).map((chunk) => chunk.name),
  ).toEqual(["countChunkTokens", "requireOllama"]);
  expect(tight.tokens).toBe(134);
  expect(tight.content).toContain(recordedChunks[0].code);
  expect(tight.content).toContain(recordedChunks[2].code);
  expect(tight.content).not.toContain(recordedChunks[1].code);
  expect(assembleRecordedContext(0).content).toBe("");
  const complete = assembleRecordedContext(750);
  expect(complete.decisions.every((chunk) => chunk.kept)).toBe(true);
  expect(complete.tokens).toBe(723);
});
