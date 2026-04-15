/**
 * Sync-Script für echte LoL-Skins.
 *
 * Standard:
 * - normale Skins bleiben drin
 * - offensichtliche Chromas werden schon beim Import entfernt
 *
 * Die Website kann Chromas später nur anzeigen, wenn sie in der JSON vorhanden sind.
 * Für einen reinen Chroma-Toggle im Frontend brauchst du also entweder:
 * 1) eine zweite JSON mit Chromas
 * 2) oder du entfernst die Filter unten bewusst wieder
 *
 * Start:
 *   node ./scripts/sync-skins.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const CHROMA_MARKERS = [
  "obsidian", "pearl", "ruby", "rose quartz", "emerald", "amethyst",
  "sapphire", "tanzanite", "catseye", "citrine", "aquamarine",
  "meteorite", "sandstone", "rainbow", "turquoise", "topaz",
  "reignited", "amber", "night blossom", "paragon", "chroma"
];

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

function isLikelyChromaName(name) {
  const lower = String(name || "").toLowerCase().trim();
  if (!lower) return false;

  for (const marker of CHROMA_MARKERS) {
    if (lower.includes(`(${marker})`)) return true;
    if (lower.endsWith(` ${marker}`)) return true;
    if (lower === marker) return true;
  }

  return false;
}

async function main() {
  const versions = await fetchJson("https://ddragon.leagueoflegends.com/api/versions.json");
  const version = versions[0];

  const championsIndex = await fetchJson(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  const champions = Object.values(championsIndex.data);

  const skins = [];
  const seen = new Set();
  let skippedByParent = 0;
  let skippedByName = 0;

  for (const champ of champions) {
    const details = await fetchJson(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champ.id}.json`
    );
    const champData = details.data[champ.id];

    for (const skin of champData.skins) {
      if (Object.hasOwn(skin, "parentSkin")) {
        skippedByParent += 1;
        continue;
      }

      const cleanName = skin.name === "default" ? champ.name : skin.name;
      if (isLikelyChromaName(cleanName)) {
        skippedByName += 1;
        continue;
      }

      const id = `${champ.id}-${skin.num}`;
      if (seen.has(id)) continue;
      seen.add(id);

      skins.push({
        id,
        championId: champ.id,
        championKey: champ.key,
        championName: champ.name,
        skinName: cleanName,
        skinNum: skin.num,
        isBase: skin.num === 0,
        patch: version,
        image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_${skin.num}.jpg`,
        loadingImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin.num}.jpg`,
        source: "Data Dragon"
      });
    }
  }

  await fs.mkdir(path.join(root, "data"), { recursive: true });
  await fs.writeFile(
    path.join(root, "data", "skins.json"),
    JSON.stringify(skins, null, 2),
    "utf8"
  );

  console.log(`Patch: ${version}`);
  console.log(`Wrote ${skins.length} skins to data/skins.json`);
  console.log(`Skipped via parentSkin: ${skippedByParent}`);
  console.log(`Skipped via chroma name: ${skippedByName}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
