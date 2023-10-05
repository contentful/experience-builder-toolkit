#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import prompts from 'prompts';
import kleur from 'kleur';
import fs from 'fs';
import path from 'path';

const defaultDir = 'react-eb-project';

init().catch((e) => {
  console.error(e);
});

async function init() {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: defaultDir,
        validate: (dir) => {
          if (fs.existsSync(dir)) {
            console.log(kleur.red(`\nDirectory ${dir} already exists`));
            process.exit();
          } else if (!isValidPackageName(dir)) {
            console.log(kleur.red(`\n${dir} is not a valid package name`));
            process.exit();
          }
          return true;
        },
      },
      {
        type: () => false, // we only have react right now
        name: 'framework',
        message: 'Select a framework:',
        initial: 0,
        choices: [
          {
            title: kleur.blue('React'),
            value: 'react',
          },
        ],
      },
    ]);

    const { projectName, framework = 'react' } = response;

    const projectDir = path.join(process.cwd(), projectName);

    fs.mkdirSync(projectDir, { recursive: true });

    // console.log(response.value); // => 24

    console.log(response); // => { value: 24 }

    // const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir);
  } catch (e) {
    console.log(e);
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}
