/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT_ID: string;
  readonly VITE_SPACE_ID: string;
  readonly VITE_PREVIEW_HOST: string;
  readonly VITE_PREVIEW_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
