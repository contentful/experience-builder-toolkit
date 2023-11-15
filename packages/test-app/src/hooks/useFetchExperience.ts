import {
  ExternalSDKMode,
  useFetchExperience as useFetchExperienceSdk,
} from '@contentful/experience-builder';
import { ContentfulClientApi } from 'contentful';
import { useEffect } from 'react';

export function useFetchExperience({
  client,
  mode,
  slug,
  experienceTypeId,
  localeCode
}: {
  client: ContentfulClientApi<undefined>;
  mode: ExternalSDKMode;
  slug: string;
  experienceTypeId: string;
  localeCode: string;
}) {
  const { experience, fetchBySlug } = useFetchExperienceSdk({
    client,
    mode,
  });

  useEffect(() => {
    fetchBySlug({ experienceTypeId, slug, localeCode });
  }, [experienceTypeId, fetchBySlug, localeCode, slug]);

  return experience;
}
