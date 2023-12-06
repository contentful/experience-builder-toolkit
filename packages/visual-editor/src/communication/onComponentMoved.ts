import { CompositionComponentNode } from '@contentful/experience-builder-core';
import { OUTGOING_EVENTS } from '@contentful/experience-builder-core';
import { sendMessage } from './sendMessage';
import { Data } from '@/core/types/Config';

export const onComponentMoved = (data: Data) => {
  sendMessage(OUTGOING_EVENTS.ComponentMoved, data);
};
