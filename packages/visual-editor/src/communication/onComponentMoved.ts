import { OUTGOING_EVENTS, sendMessage } from '@contentful/experience-builder-core';

export const onComponentMoved = (options: {
  nodeId: string;
  sourceParentId: string;
  destinationParentId: string;
  sourceIndex: number;
  destinationIndex: number;
}) => {
  sendMessage(OUTGOING_EVENTS.ComponentMoved, options);
};
