// @ts-expect-error Shared Node pipeline is authored in CommonJS.
import pipeline from "./lib/exhibitions-pipeline.cjs";

const {
  buildSiteDataset,
  cleanOutputFile,
  readJson,
  siteOutputFile,
  writeJson
} = pipeline;

async function main(): Promise<void> {
  const cleanPayload = await readJson(cleanOutputFile);
  const payload = buildSiteDataset(cleanPayload);
  await writeJson(siteOutputFile, payload);
  console.log(`已生成站点数据 ${payload.total} 条到 ${siteOutputFile}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
