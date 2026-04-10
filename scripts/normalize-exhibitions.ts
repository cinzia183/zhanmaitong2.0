// @ts-expect-error Shared Node pipeline is authored in CommonJS.
import pipeline from "./lib/exhibitions-pipeline.cjs";

const {
  cleanOutputFile,
  normalizeDataset,
  rawOutputFile,
  readJson,
  writeJson
} = pipeline;

async function main(): Promise<void> {
  const rawPayload = await readJson(rawOutputFile);
  const payload = normalizeDataset(rawPayload);
  await writeJson(cleanOutputFile, payload);
  console.log(`已清洗 ${payload.total} 条记录到 ${cleanOutputFile}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
