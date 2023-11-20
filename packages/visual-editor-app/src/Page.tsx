import {
  useExperienceBuilder,
  ExperienceRoot,
  ExternalSDKMode,
} from '@contentful/experience-builder';
import React, { useMemo } from 'react';
import { createClient } from 'contentful';
import { useParams, useSearchParams } from 'react-router-dom';
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
import '@contentful/experience-builder-components/styles.css';

const experienceTypeId = import.meta.env.VITE_EB_TYPE_ID || 'layout';

const Page: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [qs] = useSearchParams();

  const isPreview = qs.get('isPreview') === 'true';
  const isEditor = true; // qs.get('isEditor') === 'true';

  const mode = isEditor ? 'editor' : isPreview ? 'preview' : 'delivery';

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
      accessToken: accessToken as string,
    });
  }, [isPreview]);

  const { experience, defineComponents } = useExperienceBuilder({
    experienceTypeId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: client as any,
    mode: mode as ExternalSDKMode,
  });

  useExperienceBuilderComponents(defineComponents);

  return (
    <>
      <ExperienceRoot slug={slug || '/'} experience={experience} locale={'en-US'} />
    </>
  );
};

export default Page;