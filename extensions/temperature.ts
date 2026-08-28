/**
 * /temp — set the sampling temperature of any model on the fly.
 *
 * Usage:
 *   /temp 0.2                          set for the current active model
 *   /temp 0.2 deepseek-v4-pro          set for a specific model id (any provider)
 *   /temp 0.2 opencode-go/deepseek-v4-pro   set for an exact provider/model
 *
 * Writes the override to ~/.pi/agent/models.json (modelOverrides.samplingParams)
 * and reloads the model registry so it applies to subsequent requests immediately.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const MODELS_PATH = join(homedir(), ".pi", "agent", "models.json");

type ModelsJson = {
	providers: Record<
		string,
		{
			modelOverrides?: Record<
				string,
				{ samplingParams?: Record<string, unknown> }
			>;
		}
	>;
};

export default function temperatureExtension(pi: ExtensionAPI) {
	pi.registerCommand("temp", {
		description: "Set the sampling temperature of a model (e.g. /temp 0.2 [model])",
		handler: async (args, ctx) => {
			const parts = args.trim().split(/\s+/);
			const valueArg = parts[0];
			const modelArg = parts.slice(1).join(" ");

			if (!valueArg) {
				ctx.ui.notify("Usage: /temp <0..2> [model]", "error");
				return;
			}

			const temp = Number(valueArg);
			if (!Number.isFinite(temp) || temp < 0 || temp > 2) {
				ctx.ui.notify(`Invalid temperature: "${valueArg}" (expected a number 0..2)`, "error");
				return;
			}

			// Resolve target (provider, modelId).
			let provider: string | undefined;
			let modelId: string | undefined;

			if (modelArg) {
				if (modelArg.includes("/")) {
					[provider, modelId] = modelArg.split("/", 2);
				} else {
					// Bare id: match against the active model first, else search all.
					if (ctx.model?.id === modelArg) {
						provider = ctx.model.provider;
						modelId = modelArg;
					} else {
						const hit = ctx.modelRegistry
							.getAvailable()
							.find((m) => m.id === modelArg);
						if (hit) {
							provider = hit.provider;
							modelId = hit.id;
						}
					}
					if (!provider) {
						ctx.ui.notify(`Unknown model: "${modelArg}"`, "error");
						return;
					}
				}
			} else if (ctx.model) {
				provider = ctx.model.provider;
				modelId = ctx.model.id;
			} else {
				ctx.ui.notify("No active model; specify one: /temp 0.2 <model>", "error");
				return;
			}

			if (!provider || !modelId) {
				ctx.ui.notify(`Could not parse model target: "${modelArg}"`, "error");
				return;
			}

			// Load and update models.json.
			let config: ModelsJson = { providers: {} };
			try {
				const raw = await readFile(MODELS_PATH, "utf-8");
				config = JSON.parse(raw) as ModelsJson;
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
					ctx.ui.notify(`Failed to read models.json: ${String(error)}`, "error");
					return;
				}
			}

			const prov = (config.providers[provider] ??= {});
			const overrides = (prov.modelOverrides ??= {});
			const override = (overrides[modelId] ??= {});
			override.samplingParams = { ...(override.samplingParams ?? {}), temperature: temp };
			prov.modelOverrides = overrides;

			try {
				await writeFile(MODELS_PATH, JSON.stringify(config, null, 2) + "\n", "utf-8");
			} catch (error) {
				ctx.ui.notify(`Failed to write models.json: ${String(error)}`, "error");
				return;
			}

			// Reload models.json so the change applies immediately.
			await ctx.modelRegistry.refresh();

			ctx.ui.notify(`Set temperature=${temp} for ${provider}/${modelId}`, "info");
		},
	});
}
