import { useFetchExperience, defineComponents, ExperienceRoot } from '@contentful/experience-builder';
import React, { useEffect, useMemo } from 'react';
import { createClient } from 'contentful';
import { useParams, useSearchParams } from 'react-router-dom';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import '@contentful/experience-builder-components/styles.css';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

const Page: React.FC = () => {
  const localeCode = 'en-US';
  const [qs] = useSearchParams();

  // Configure Content Preview URL in your space settings to include "/{entry.fields.slug}"
  const { slug = 'SLUG_MISSING_FROM_URL' } = useParams<{ slug: string }>();

  // Run preview mode when loaded in an iframe or if the url contains isPreview=true
  const isPreview = window.self !== window.top || qs.get('isPreview') === 'true';

  const mode = isPreview ? 'preview' : 'delivery';

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

  useExperienceBuilderComponents(defineComponents);

  if (!experience) {
    return null;
  }

  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default Page;
