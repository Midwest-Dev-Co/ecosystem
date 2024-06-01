import { intro, outro } from '@clack/prompts';
import pico from 'picocolors';
import { prompts } from './prompts';
import {
    cloneTemplate,
    createOrFindprojectDirectory,
    installDeps,
    removeLockFile,
    updatePackageJSON,
} from './helpers';

const { bgBlue, bgGreen } = pico;

async function main() {
    intro(bgBlue(' create-mdc-app '));

    const {
        installDependencies,
        projectDirectory,
        projectName,
        templateChoice,
    } = await prompts();

    await createOrFindprojectDirectory({ projectDirectory });

    await cloneTemplate({ templateChoice, projectDirectory });

    await updatePackageJSON({
        projectDirectory,
        projectName,
    });

    await removeLockFile({ projectDirectory });

    if (installDependencies) await installDeps({ projectDirectory });

    outro(bgGreen(" You're all set! "));
}

main().catch(console.error);
