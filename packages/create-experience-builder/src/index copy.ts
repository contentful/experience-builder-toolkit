#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import prompts from 'prompts';
import kleur from 'kleur';
import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { fileURLToPath } from 'node:url';
import { allFrameworks } from './models.js';

const defaultDir = 'react-eb-project';

init().catch((e) => {
  console.error(e);
});

async function init() {
  console.log(
    `\n👋 Welcome to the Contentful Experience Builder!
We will guide you through creating a new project that will be ready-to-go with Experience Builder!\n`
  );

  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name (where we will install the project)',
        initial: defaultDir,
        validate: (dir) => {
          if (fs.existsSync(dir)) {
            console.log(kleur.red(`\nDirectory ${dir} already exists\n`));
            process.exit();
          } else if (!isValidPackageName(dir)) {
            console.log(kleur.red(`\n${dir} is not a valid package name\n`));
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
        choices: allFrameworks.map((framework) => {
          return {
            title: framework.color(framework.display),
            value: framework.name,
          };
        }),
      },
      {
        type: () => false, // we only have react-vite-ts right now
        name: 'variant',
        message: 'Select a variant:',
        initial: 0,
        choices: (prev) => {
          console.log({ prev });
          return allFrameworks
            .find((f) => f.name === prev)
            ?.variants.map((variant) => {
              return {
                title: variant.color(variant.display),
                value: variant.name,
              };
            });
        },
      },
    ]);

    const { projectName, framework = 'react', variant = 'vite-ts' } = response;

    if (!projectName) {
      console.warn('No project name specified, aborting...');
      process.exit();
    }

    const variantToUse = allFrameworks
      .find((f) => f.name === framework)
      ?.variants.find((v) => v.name === variant);

    if (!variantToUse) {
      console.error(`error finding variant for ${framework} ${variant}`);
      process.exit(1);
    }

    const projectDisplayName = variantToUse.display;

    const installCommand = variantToUse.installCommand.replace('PROJECT_NAME', projectName);

    // const projectDir = createDirectory(projectName);

    const projectDir = getProjectDir(projectName);

    const installEbLibsCommand = `npm i --prefix ${projectDir} @contentful/experience-builder @contentful/experience-builder-components`;

    // copyTemplate(projectDir, templateDir);

    // const pkgInfo = packageFromUserAgent(process.env.npm_config_user_agent);
    // const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

    console.log(
      `\nCreating a new Contentful Experience Builder project using ${projectDisplayName}..\n`
    );

    const installStatus = runCommand(installCommand);

    if (installStatus !== 0) {
      console.error(`error running ${installCommand}`);
      process.exit(1);
    }

    // copy template files
    const templateDir = getTemplateDir(`${framework}-${variant}`);

    copyTemplateFiles(projectDir, templateDir, variantToUse.srcDir);

    console.log('\nInstalling dependencies, this might take a minute...⏰\n');

    const extLibStatus = runCommand(installEbLibsCommand);

    if (extLibStatus !== 0) {
      console.error(`error running ${installEbLibsCommand}`);
      process.exit(1);
    }

    console.log(
      `Done installing packages 🎉! Your project is ready and located in the ${projectName} folder.`
    );

    // console.log({ status, status2 });

    // copyTemplate(projectDir, templateDir);
  } catch (e) {
    console.log(e);
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

function createDirectory(projectName: any) {
  const projectDir = getProjectDir(projectName);
  fs.mkdirSync(projectDir, { recursive: true });
  return projectDir;
}

function copyTemplateFiles(projectDir: string, templateDir: string, srcDir: string) {
  fs.rmSync(path.join(projectDir, srcDir), { recursive: true, force: true });
  fs.cpSync(path.join(templateDir, srcDir), path.join(projectDir, srcDir), { recursive: true });
  fs.cpSync(path.join(templateDir, '.env.local'), path.join(projectDir, '.env.local'));
}

function getProjectDir(projectName: string) {
  return path.join(process.cwd(), projectName);
}

function getTemplateDir(framework: string) {
  return path.join(fileURLToPath(import.meta.url), '../../templates', framework);
}

function runCommand(command: string) {
  const [commandName, ...args] = command.split(' ');
  const { status } = spawn.sync(commandName, args, {
    stdio: 'pipe',
  });
  return status;
}

function packageFromUserAgent(userAgent?: string) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}
