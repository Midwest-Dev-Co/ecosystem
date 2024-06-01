import { cancel, group, select, text, confirm } from '@clack/prompts';

interface CliGroup {
    projectName: string;
    projectDirectory: string;
    templateChoice: string;
    uiLibraryChoice: string;
    installDependencies: boolean;
}

export async function prompts() {
    return group(
        {
            projectName: () =>
                text({
                    message: 'What will the name of the project be?',
                    validate: (value) => {
                        if (value.length === 0)
                            return 'Project name is required!';
                    },
                }),
            projectDirectory: ({ results }) =>
                text({
                    message: 'Where should the project be created?',
                    placeholder: '.',
                    initialValue: `./${results.projectName}`,
                    validate: (value) => {
                        if (value.length === 0)
                            return 'Project directory is required!';
                    },
                }),
            templateChoice: ({ results }) =>
                select<{ value: string; label: string }[], string>({
                    message: 'Please choose your template:',
                    options: [
                        {
                            value: `https://github.com/Midwest-Dev-Co/ecosystem/templates/base-shadcn`,
                            label: `Base Template`,
                        },
                        {
                            value: `https://github.com/Midwest-Dev-Co/ecosystem/templates/cms-shadcn`,
                            label: `CMS Template`,
                        },
                    ],
                }),
            installDependencies: () =>
                confirm({
                    message: 'Install dependencies?',
                }),
        },
        {
            onCancel: () => {
                cancel(' Bye! ');
                process.exit(0);
            },
        }
    ) as Promise<CliGroup>;
}
