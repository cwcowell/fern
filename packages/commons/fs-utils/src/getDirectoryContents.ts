import { readdir, readFile } from "fs/promises";
import path from "path";
import { AbsoluteFilePath } from "./AbsoluteFilePath";
import { join } from "./join";
import { RelativeFilePath } from "./RelativeFilePath";

export type FileOrDirectory = File | Directory;

export interface File {
    type: "file";
    name: string;
    contents: string;
    absolutePath: AbsoluteFilePath;
}

export interface Directory {
    type: "directory";
    name: string;
    contents: FileOrDirectory[];
    absolutePath: AbsoluteFilePath;
}

export declare namespace getDirectoryContents {
    export interface Options {
        fileExtensions?: string[];
    }
}

export async function getDirectoryContents(
    absolutePath: AbsoluteFilePath,
    options: getDirectoryContents.Options = {}
): Promise<FileOrDirectory[]> {
    const fileExtensionsWithPeriods =
        options.fileExtensions != null
            ? new Set(
                  options.fileExtensions.map((fileExtension) =>
                      fileExtension.startsWith(".") ? fileExtension : `.${fileExtension}`
                  )
              )
            : undefined;

    const contents: FileOrDirectory[] = [];

    const items = await readdir(absolutePath, { withFileTypes: true });
    await Promise.all(
        items.map(async (item) => {
            const absolutePathToItem = join(absolutePath, RelativeFilePath.of(item.name));
            if (item.isDirectory()) {
                contents.push({
                    type: "directory",
                    name: item.name,
                    absolutePath: absolutePathToItem,
                    contents: await getDirectoryContents(absolutePathToItem, options)
                });
            } else if (fileExtensionsWithPeriods == null || fileExtensionsWithPeriods.has(path.extname(item.name))) {
                contents.push({
                    type: "file",
                    name: item.name,
                    absolutePath: absolutePathToItem,
                    contents: (await readFile(path.join(absolutePath, item.name))).toString()
                });
            }
        })
    );

    return contents.sort((a, b) => (a.name < b.name ? -1 : 1));
}

export type SnapshotFileOrDirectory = SnapshotFile | SnapshotDirectory;

export interface SnapshotFile {
    type: "file";
    name: string;
    contents: string;
}

export interface SnapshotDirectory {
    type: "directory";
    name: string;
    contents: SnapshotFileOrDirectory[];
}

export async function getDirectoryContentsForSnapshot(
    absolutePath: AbsoluteFilePath,
    options: getDirectoryContents.Options = {}
): Promise<SnapshotFileOrDirectory[]> {
    const contents = await getDirectoryContents(absolutePath, options);
    const removeAbsolutePath = (fileOrDir: FileOrDirectory): SnapshotFileOrDirectory => {
        if (fileOrDir.type === "file") {
            return { type: "file", name: fileOrDir.name, contents: fileOrDir.contents };
        } else {
            return {
                type: "directory",
                name: fileOrDir.name,
                contents: fileOrDir.contents.map((item) => removeAbsolutePath(item))
            };
        }
    };
    return contents.map((item) => removeAbsolutePath(item));
}
