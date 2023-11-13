import { SchemaVersions } from './types';

export * from '@contentful/experience-builder-types/dist/constants';
// this is the array of version which currently LATEST_SCHEMA_VERSION is compatible with
export const compatibleVersions: SchemaVersions[] = ['2023-08-23', '2023-09-28'];

export { SDK_VERSION } from './sdkVersion';
