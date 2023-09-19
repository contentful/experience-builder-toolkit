import { ComponentRegistration } from '@contentful/experience-builder';
import { ExperienceBuilderButton, ExperienceBuilderRichText } from '..';
import { useEffect } from 'react';

export default function useExperienceBuilderComponents(
  defineComponents: (componentRegistrations: ComponentRegistration[]) => void
) {
  useEffect(() => {
    defineComponents([
      {
        component: ExperienceBuilderButton,
        definition: ExperienceBuilderButton.ComponentDefinition,
      },
      {
        component: ExperienceBuilderRichText,
        definition: ExperienceBuilderRichText.ComponentDefinition,
      },
    ]);
  }, []);
}
