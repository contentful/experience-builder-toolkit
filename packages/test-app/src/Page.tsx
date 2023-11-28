import {
  useFetchExperience,
  defineComponents,
  ExperienceRoot,
} from '@contentful/experience-builder';
import { createClient } from 'contentful';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import '@contentful/experience-builder-components/styles.css';

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID || '',
  environment: import.meta.env.VITE_ENVIRONMENT_ID || 'master',
  host: import.meta.env.VITE_PREVIEW_HOST || 'preview.contentful.com',
  accessToken: import.meta.env.VITE_PREVIEW_ACCESS_TOKEN || '',
});

export default function Page() {
  useFetchExperience({ client, mode: 'preview' });
  useExperienceBuilderComponents(defineComponents);
  return <ExperienceRoot locale="en-US" />;
}
