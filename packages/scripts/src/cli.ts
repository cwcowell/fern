import { cwd, resolve } from "@fern-api/fs-utils";
import { noop } from "lodash-es";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { checkReleaseBlockers } from "./checkReleaseBlockers";
import { checkRootPackage } from "./checkRootPackage";
import { AbsoluteFilePath } from "@fern-api/fs-utils";
import { DefinitionFileSchema } from "@fern-api/fern-definition-schema";
import { writeFile } from "fs/promises";
import prettier from "prettier";
import { zodToJsonSchema } from "zod-to-json-schema";

void yargs(hideBin(process.argv))
    .scriptName(process.env.CLI_NAME ?? "fern-scripts")
    .strict()
    .command(
        "write-json-schema <filepath>",
        "Write the Fern API JSON schema to the root of the repo",
        (yargs) =>
            yargs.positional("filepath", {
                type: "string",
                demandOption: true
            }),
        async (argv) => {
            const filepath = argv.filepath;
            const jsonSchema = zodToJsonSchema(DefinitionFileSchema, "Fern Definition");
            const jsonSchemaStr = JSON.stringify(jsonSchema);
            const config = (await prettier.resolveConfig(filepath)) ?? undefined;
            const jsonSchemaFormatted = prettier.format(jsonSchemaStr, { ...config, filepath });
            await writeFile(filepath, jsonSchemaFormatted);
        }
    )
    .command(
        "check-root-package",
        "Check (or fix) the package.json of the root package",
        (argv) =>
            argv.option("fix", {
                boolean: true,
                default: false
            }),
        async (argv) => {
            await checkRootPackage({
                shouldFix: argv.fix
            });
        }
    )
    .command("check-cli-release-blockers", "Check that there are no release blockers for CLI", noop, async () => {
        await checkReleaseBlockers("release-blockers-cli.yml");
    })
    .command("check-docs-release-blockers", "Check that there are no release blockers for docs", noop, async () => {
        await checkReleaseBlockers("release-blockers-docs.yml");
    })
    .demandCommand()
    .showHelpOnFail(true)
    .parse();
