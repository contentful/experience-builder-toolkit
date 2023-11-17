import {
  useFetchExperience,
  defineComponents,
  ExperienceRoot,
  ExternalSDKMode,
} from '@contentful/experience-builder';
import React, { useEffect } from 'react';
import { createClient } from 'contentful';
import { useParams } from 'react-router-dom';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import '@contentful/experience-builder-components/styles.css';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

const isPreview = window.location.search.includes('isPreview=true');

const mode = isPreview ? 'preview' : ((import.meta.env.VITE_MODE || 'delivery') as ExternalSDKMode);

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID || '',
  environment: import.meta.env.VITE_ENVIRONMENT_ID || 'master',
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: isPreview
    ? import.meta.env.VITE_PREVIEW_ACCESS_TOKEN
    : import.meta.env.VITE_ACCESS_TOKEN,
});

const Page: React.FC = () => {
  // Configure Content Preview URL in your space settings to include "/{entry.fields.slug}"
  const { slug = '/' } = useParams<{ slug: string }>();
  const localeCode = 'en-US';

  const { experience, fetchBySlug } = useFetchExperience({
    client,
    mode,
  });

  useEffect(() => {
    fetchBySlug({ experienceTypeId, slug, localeCode });
  }, [fetchBySlug, localeCode, slug]);

  useExperienceBuilderComponents(defineComponents);

  if (!experience) {
    return null;
  }

  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default Page;
