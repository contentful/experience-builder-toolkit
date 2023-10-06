import kleur from 'kleur';

type ColorFunc = (str: string | number) => string;

export interface Framework {
  name: string;
  display: string;
  color: ColorFunc;
  variants: FrameworkVariant[];
}

export interface FrameworkVariant {
  name: string;
  display: string;
  color: ColorFunc;
  installCommand: string;
  srcDir: string;
  defaultDir: string;
}

export const allFrameworks: Framework[] = [
  {
    name: 'react',
    display: 'React',
    color: kleur.cyan,
    variants: [
      {
        name: 'vite-ts',
        display: 'React Vite + TypeScript',
        color: kleur.white,
        // customCommand: 'npm create vite@latest PROJECT_NAME',
        installCommand: 'npm create vite@latest PROJECT_NAME -- --template react-ts',
        srcDir: 'src',
        defaultDir: 'react-eb-project',
      },
    ],
  },
];
