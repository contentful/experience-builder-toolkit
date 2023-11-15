import { defineComponents, ExperienceRoot, ExternalSDKMode } from '@contentful/experience-builder';
import React, { useMemo } from 'react';
import { createClient } from 'contentful';
import { useParams } from 'react-router-dom';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import '@contentful/experience-builder-components/styles.css';
import { useFetchExperience } from './hooks/useFetchExperience';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

const Page: React.FC = () => {
  const localeCode = 'en-US';
  const { slug = 'SLUG_MISSING_FROM_URL' } = useParams<{ slug: string }>();

  const mode = (import.meta.env.VITE_MODE || 'delivery') as ExternalSDKMode;
  const isPreview = mode === 'preview';

  const client = useMemo(() => {
    const space = import.meta.env.VITE_SPACE_ID || '';
    const environment = import.meta.env.VITE_ENVIRONMENT_ID || 'master';
    const accessToken = isPreview
      ? import.meta.env.VITE_PREVIEW_ACCESS_TOKEN
      : import.meta.env.VITE_ACCESS_TOKEN;
    const host = isPreview ? 'preview.contentful.com' : 'cdn.contentful.com';

    return createClient({
      space,
      environment,
      host,
      accessToken,
    });
  }, [isPreview]);

  const experience = useFetchExperience({
    client,
    mode,
    slug,
    experienceTypeId,
    localeCode,
  });

  useExperienceBuilderComponents(defineComponents);

  if (!experience) {
    return null;
  }

  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default Page;
