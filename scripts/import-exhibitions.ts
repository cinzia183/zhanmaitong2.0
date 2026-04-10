// @ts-expect-error Shared Node pipeline is authored in CommonJS.
import pipeline from "./lib/exhibitions-pipeline.cjs";

const { importSources, rawOutputFile, writeJson } = pipeline;

async function main(): Promise<void> {
  const payload = await importSources();
  await writeJson(rawOutputFile, payload);
  console.log(`已导入 ${payload.record_count} 条原始记录到 ${rawOutputFile}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
