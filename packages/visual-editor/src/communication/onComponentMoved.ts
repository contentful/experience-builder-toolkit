import { OUTGOING_EVENTS } from '@contentful/experience-builder-core';
import { sendMessage } from './sendMessage';

export const onComponentMoved = (options: {
  nodeId: string;
  sourceParentId: string;
  destinationParentId: string;
  sourceIndex: number;
  destinationIndex: number;
}) => {
  sendMessage(OUTGOING_EVENTS.ComponentMoved, options);
};
