import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
      },
    ],
    plugins: [nodeResolve(), typescript({ tsconfig: './tsconfig.json' })],
    external: [/node_modules\/(?!tslib.*)/],
  },
];
