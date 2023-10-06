#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import prompts from 'prompts';
import kleur from 'kleur';
import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { fileURLToPath } from 'node:url';
import { allFrameworks } from './models.js';
import { intro, outro, select, spinner, text } from '@clack/prompts';

const defaultDir = 'react-eb-project';

init().catch((e) => {
  console.error(e);
});

async function init() {
  try {
    intro(
      `👋 Welcome to the Contentful Experience Builder!\nWe will guide you through creating a new project that will be ready-to-go with Experience Builder!`
    );

    const projectType = await select({
      message: 'Pick a project type.',
      options: allFrameworks.map((framework) => {
        return {
          label: framework.color(framework.display),
          value: framework.name,
        };
      }),
    });

    const framework = allFrameworks.find((f) => f.name === projectType)!;

    const variantType = await select({
      message: `What type of ${framework?.display} project?`,
      options: framework.variants.map((variant) => {
        return {
          label: variant.color(variant.display),
          value: variant.name,
        };
      }),
    });

    const variant = framework.variants.find((v) => v.name === variantType)!;

    const projectName = (await text({
      message: 'Where should we install the project?',
      initialValue: variant.defaultDir,
      validate(dir) {
        if (dir.length === 0) return `Value is required!`;
        if (fs.existsSync(dir)) {
          return `Directory ${dir} already exists`;
        } else if (!isValidPackageName(dir)) {
          return `${dir} is not a valid package name`;
        }
      },
    })) as string;

    const installCommand = variant.installCommand.replace('PROJECT_NAME', projectName);

    // // const projectDir = createDirectory(projectName);

    const projectDir = getProjectDir(projectName);

    // // copyTemplate(projectDir, templateDir);

    // // const pkgInfo = packageFromUserAgent(process.env.npm_config_user_agent);
    // // const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

    const createProjSpinner = spinner();

    createProjSpinner.start(
      `Creating a new Contentful Experience Builder project using ${variant.display}...`
    );

    //sleep
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const installStatus = await runCommand(installCommand);

    if (installStatus !== 0) {
      console.error(`error running ${installCommand}`);
      process.exit(1);
    }

    const templateDir = getTemplateDir(`${framework.name}-${variant.name}`);

    copyTemplateFiles(projectDir, templateDir, variant.srcDir);

    createProjSpinner.stop(`Done creating ${variant.display} project`);

    const installDepsSpinner = spinner();

    installDepsSpinner.start('Installing dependencies, this might take a minute ⏰');

    //sleep
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const installEbLibsCommand = `npm i --prefix ${projectDir} @contentful/experience-builder @contentful/experience-builder-components`;

    const ebLibStatus = await runCommand(installEbLibsCommand);

    if (ebLibStatus !== 0) {
      console.error(`error running ${installEbLibsCommand}`);
      process.exit(1);
    }

    installDepsSpinner.stop('Done installing packages!');

    outro(`Your project is ready and located in the ${projectName} folder.`);

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

async function runCommand(command: string) {
  return new Promise<number | null>((res) => {
    const [commandName, ...args] = command.split(' ');
    spawn(commandName, args, {
      stdio: 'ignore',
    }).on('exit', (code) => {
      res(code);
    });
  });
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
