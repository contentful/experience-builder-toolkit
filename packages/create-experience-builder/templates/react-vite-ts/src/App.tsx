import React, { useEffect, useMemo } from 'react';
import { createClient } from 'contentful';
import {
  defineComponents,
  ExperienceRoot,
  useFetchExperience,
} from '@contentful/experience-builder';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';

// Import the styles for the default components
import '@contentful/experience-builder-components/styles.css';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

function App() {
  // Run preview mode when loaded in an iframe or if the url contains isPreview=true
  const isPreview = window.self !== window.top || window.location.search.includes('isPreview=true');

  const mode = isPreview ? 'preview' : 'delivery';
  const localeCode = 'en-US';
  const slug = 'homePage';

  // Create a Contentful client
  const client = useMemo(() => {
    return createClient({
      space: import.meta.env.VITE_SPACE_ID || '',
      environment: import.meta.env.VITE_ENVIRONMENT_ID || 'master',
      host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
      accessToken: isPreview
        ? import.meta.env.VITE_PREVIEW_ACCESS_TOKEN
        : import.meta.env.VITE_ACCESS_TOKEN,
    });
  }, [isPreview]);

  const { experience, fetchBySlug } = useFetchExperience({
    client,
    mode,
  });

  useEffect(() => {
    fetchBySlug({ experienceTypeId, slug, localeCode });
  }, [fetchBySlug, localeCode, slug]);

  // Register optional default components
  useExperienceBuilderComponents(defineComponents);

  if (!experience) {
    return null;
  }

  return <ExperienceRoot experience={experience} locale={localeCode} />;
}

export default App;
