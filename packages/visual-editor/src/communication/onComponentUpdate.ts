import { CompositionComponentNode } from '@contentful/experience-builder-core';

export const onComponentUpdate = ({
  node,
  index,
  parentBlockId,
  parentType,
}: {
  node: CompositionComponentNode;
  index?: number;
  parentType?: string;
  parentBlockId?: string;
}) => {
  // sendMessage(OUTGOING_EVENTS.ComponentDropped, {
  //   node,
  //   index: index ?? node.children.length,
  //   parentBlockId,
  //   parentType,
  // });
};
