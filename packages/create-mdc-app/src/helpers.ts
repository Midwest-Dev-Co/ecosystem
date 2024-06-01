import p from 'path';
import fe from 'fs-extra';
import { execaCommand } from 'execa';
import degit from 'degit';
import { spinner } from '@clack/prompts';

const { pathExists, mkdir, readJson, writeJson, existsSync, remove } = fe;
const { resolve } = p;

export async function createOrFindprojectDirectory({
    projectDirectory,
}: {
    projectDirectory: string;
}): Promise<void> {
    if (!(await pathExists(projectDirectory))) {
        await mkdir(projectDirectory);
    }
}

export async function updatePackageJSON({
    projectDirectory,
    projectName,
}: {
    projectDirectory: string;
    projectName: string;
}): Promise<void> {
    const packageJsonPath = resolve(projectDirectory, 'package.json');
    try {
        const packageObj = await readJson(packageJsonPath);
        packageObj.name = projectName;
        await writeJson(packageJsonPath, packageObj, { spaces: 2 });
    } catch (err) {
        console.error('Unable to update name in package.json', err);
    }
}

export async function installDeps({
    projectDirectory,
}: {
    projectDirectory: string;
}): Promise<void> {
    try {
        const s = spinner();
        s.start('Installing dependencies via Yarn');
        await execaCommand('yarn', { cwd: resolve(projectDirectory) });
        s.stop('Dependencies installed via Yarn');
    } catch (err) {
        console.error('Failed to install dependencies', err);
    }
}

export async function removeLockFile({
    projectDirectory,
}: {
    projectDirectory: string;
}): Promise<void> {
    const lockPath = resolve(projectDirectory, 'yarn.lock');
    if (existsSync(lockPath)) {
        await remove(lockPath);
    }
}

export async function cloneTemplate({
    templateChoice,
    projectDirectory,
}: {
    templateChoice: string;
    projectDirectory: string;
}) {
    const emitter = degit(templateChoice);
    await emitter.clone(projectDirectory);
}
