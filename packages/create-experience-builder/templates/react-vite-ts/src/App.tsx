import React, { useEffect } from 'react';
import { createClient } from 'contentful';
import {
  defineComponents,
  ExperienceRoot,
  ExternalSDKMode,
  useFetchExperience,
} from '@contentful/experience-builder';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import './App.css';

// Import the styles for the default components
import '@contentful/experience-builder-components/styles.css';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

// Run in preview mode if the url contains isPreview=true
const isPreview = window.location.search.includes('isPreview=true');

const mode = isPreview ? 'preview' : ((import.meta.env.VITE_MODE || 'delivery') as ExternalSDKMode);

// Use experience with locale 'en-US' and slug 'homePage'
const localeCode = 'en-US';
const slug = 'homePage';

// Create a Contentful client
const client = createClient({
  space: import.meta.env.VITE_SPACE_ID || '',
  environment: import.meta.env.VITE_ENVIRONMENT_ID || 'master',
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: isPreview
    ? import.meta.env.VITE_PREVIEW_ACCESS_TOKEN
    : import.meta.env.VITE_ACCESS_TOKEN,
});

function App() {
  const { experience, fetchBySlug } = useFetchExperience({
    client,
    mode,
  });

  useEffect(() => {
    fetchBySlug({ experienceTypeId, slug, localeCode });
  }, [fetchBySlug]);

  // Register optional default components
  useExperienceBuilderComponents(defineComponents);

  if (!experience) {
    return null;
  }

  return <ExperienceRoot experience={experience} locale={localeCode} />;
}

export default App;
