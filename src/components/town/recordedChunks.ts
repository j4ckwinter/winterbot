// Recorded from brain-cache 34a4ebb with @anthropic-ai/tokenizer 0.0.4.
export const recordedChunks = [
  {
    name: "countChunkTokens",
    path: "src/services/tokenCounter.ts",
    terms: "tokens estimate",
    code: "function countChunkTokens(text: string): number {\n  if (text.length === 0) return 0;\n  return countTokens(text);\n}",
    why: "Uses a local tokenizer to estimate the size of a context block.",
    source:
      "https://github.com/j4ckwinter/brain-cache/blob/34a4ebb4760cb594119133bc42679f4fb8fde396/src/services/tokenCounter.ts#L12",
    formatted:
      "// File: src/services/tokenCounter.ts (lines 12-15)\nfunction countChunkTokens(text: string): number {\n  if (text.length === 0) return 0;\n  return countTokens(text);\n}",
  },
  {
    name: "assembleContext",
    path: "src/services/tokenCounter.ts",
    terms: "budget context",
    code: "function assembleContext(\n  chunks: RetrievedChunk[],\n  opts: { maxTokens: number }\n): AssembledContext {\n  const kept: RetrievedChunk[] = [];\n  let content = '';\n  let totalTokens = 0;\n  let hasHistory = false;\n  const ordered = [\n    ...chunks.filter(chunk => chunk.sourceKind !== 'history'),\n    ...chunks.filter(chunk => chunk.sourceKind === 'history'),\n  ];\n\n  for (const chunk of ordered) {\n    const isHistory = chunk.sourceKind === 'history';\n    const separator = content.length === 0 ? '' : isHistory ? '\\n\\n' : '\\n\\n---\\n\\n';\n    const heading = isHistory && !hasHistory ? '## Git History\\n\\n' : '';\n    const formatted = isHistory\n      ? `### ${chunk.name ?? chunk.id}\\n${chunk.content}`\n      : formatChunk(chunk);\n    const candidate = content + separator + heading + formatted;\n    const candidateTokens = countChunkTokens(candidate);\n\n    if (candidateTokens > opts.maxTokens) {\n      log.debug({ candidateTokens, maxTokens: opts.maxTokens }, 'Skipping chunk that exceeds token budget');\n      continue;\n    }\n\n    kept.push(chunk);\n    content = candidate;\n    totalTokens = candidateTokens;\n    if (isHistory) hasHistory = true;\n  }\n\n  return { content, chunks: kept, tokenCount: totalTokens };\n}",
    why: "Keeps complete chunks in retrieval order and skips those that exceed the token budget.",
    source:
      "https://github.com/j4ckwinter/brain-cache/blob/34a4ebb4760cb594119133bc42679f4fb8fde396/src/services/tokenCounter.ts#L37",
    formatted:
      "// File: src/services/tokenCounter.ts (lines 37-72)\nfunction assembleContext(\n  chunks: RetrievedChunk[],\n  opts: { maxTokens: number }\n): AssembledContext {\n  const kept: RetrievedChunk[] = [];\n  let content = '';\n  let totalTokens = 0;\n  let hasHistory = false;\n  const ordered = [\n    ...chunks.filter(chunk => chunk.sourceKind !== 'history'),\n    ...chunks.filter(chunk => chunk.sourceKind === 'history'),\n  ];\n\n  for (const chunk of ordered) {\n    const isHistory = chunk.sourceKind === 'history';\n    const separator = content.length === 0 ? '' : isHistory ? '\\n\\n' : '\\n\\n---\\n\\n';\n    const heading = isHistory && !hasHistory ? '## Git History\\n\\n' : '';\n    const formatted = isHistory\n      ? `### ${chunk.name ?? chunk.id}\\n${chunk.content}`\n      : formatChunk(chunk);\n    const candidate = content + separator + heading + formatted;\n    const candidateTokens = countChunkTokens(candidate);\n\n    if (candidateTokens > opts.maxTokens) {\n      log.debug({ candidateTokens, maxTokens: opts.maxTokens }, 'Skipping chunk that exceeds token budget');\n      continue;\n    }\n\n    kept.push(chunk);\n    content = candidate;\n    totalTokens = candidateTokens;\n    if (isHistory) hasHistory = true;\n  }\n\n  return { content, chunks: kept, tokenCount: totalTokens };\n}",
  },
  {
    name: "requireOllama",
    path: "src/lib/guards.ts",
    terms: "offline connection",
    code: "async function requireOllama(): Promise<void> {\n  const running = await isOllamaRunning();\n  if (!running) {\n    throw new Error(\"Ollama is not running. Start it with 'ollama serve' or run 'brain-cache init'.\");\n  }\n}",
    why: "Checks that Ollama is available before a workflow that needs it.",
    source:
      "https://github.com/j4ckwinter/brain-cache/blob/34a4ebb4760cb594119133bc42679f4fb8fde396/src/lib/guards.ts#L20",
    formatted:
      "// File: src/lib/guards.ts (lines 20-25)\nasync function requireOllama(): Promise<void> {\n  const running = await isOllamaRunning();\n  if (!running) {\n    throw new Error(\"Ollama is not running. Start it with 'ollama serve' or run 'brain-cache init'.\");\n  }\n}",
  },
  {
    name: "checkIndexStaleness",
    path: "src/lib/staleness.ts",
    terms: "stale index",
    code: "async function checkIndexStaleness(\n  rootDir: string,\n  indexedAt: string,\n): Promise<StalenessResult> {\n  const indexedAtMs = Date.parse(indexedAt);\n  const files = await crawlSourceFiles(rootDir);\n\n  const statsMap = await statAllFiles(files, FILE_READ_CONCURRENCY);\n\n  let stalestFile: string | undefined;\n  let stalestMtimeMs = 0;\n\n  for (const filePath of files) {\n    const entry = statsMap.get(filePath);\n    if (!entry) continue; // file vanished between crawl and stat\n    if (entry.mtimeMs > indexedAtMs && entry.mtimeMs > stalestMtimeMs) {\n      stalestMtimeMs = entry.mtimeMs;\n      stalestFile = filePath;\n    }\n  }\n\n  if (stalestFile) {\n    return {\n      stale: true,\n      stalestFile,\n      stalestMtime: new Date(stalestMtimeMs).toISOString(),\n    };\n  }\n  return { stale: false };\n}",
    why: "Compares source modification times with the last successful index.",
    source:
      "https://github.com/j4ckwinter/brain-cache/blob/34a4ebb4760cb594119133bc42679f4fb8fde396/src/lib/staleness.ts#L11",
    formatted:
      "// File: src/lib/staleness.ts (lines 11-40)\nasync function checkIndexStaleness(\n  rootDir: string,\n  indexedAt: string,\n): Promise<StalenessResult> {\n  const indexedAtMs = Date.parse(indexedAt);\n  const files = await crawlSourceFiles(rootDir);\n\n  const statsMap = await statAllFiles(files, FILE_READ_CONCURRENCY);\n\n  let stalestFile: string | undefined;\n  let stalestMtimeMs = 0;\n\n  for (const filePath of files) {\n    const entry = statsMap.get(filePath);\n    if (!entry) continue; // file vanished between crawl and stat\n    if (entry.mtimeMs > indexedAtMs && entry.mtimeMs > stalestMtimeMs) {\n      stalestMtimeMs = entry.mtimeMs;\n      stalestFile = filePath;\n    }\n  }\n\n  if (stalestFile) {\n    return {\n      stale: true,\n      stalestFile,\n      stalestMtime: new Date(stalestMtimeMs).toISOString(),\n    };\n  }\n  return { stale: false };\n}",
  },
];

export const contextTokenEstimates = [
  0, 50, 333, 388, 79, 134, 417, 472, 246, 301, 584, 639, 330, 385, 668, 723,
];

export function assembleRecordedContext(budget: number) {
  let mask = 0;
  const decisions = recordedChunks.map((chunk, index) => {
    const candidate = mask | (1 << index);
    const kept = contextTokenEstimates[candidate] <= budget;
    if (kept) mask = candidate;
    return { ...chunk, kept, estimate: contextTokenEstimates[1 << index] };
  });
  return {
    decisions,
    tokens: contextTokenEstimates[mask],
    content: decisions
      .filter((chunk) => chunk.kept)
      .map((chunk) => chunk.formatted)
      .join("\n\n---\n\n"),
  };
}
