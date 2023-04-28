import tokens from "@contentful/f36-tokens";
import { css, cx } from "@emotion/css";
import React from "react";
import { BindingMapByBlockId, BoundData } from "../types";
import { useInteraction } from "../hooks/useInteraction";
import { VisualEditorBlock } from "./VisualEditorBlock";

const styles = {
  root: css({
    height: '92vh',
  }),
  hover: css({
    border: `3px solid transparent`,
    '&:hover': {
      border: `3px solid ${tokens.blue500}`,  
    }
  })
};

type VisualEditorRootProps = {
  visualEditorData?: Record<string, any>;
  binding: BindingMapByBlockId;
  boundData: BoundData;
};

export const VisualEditorRoot = ({
  visualEditorData = {},
  binding,
  boundData,
}: VisualEditorRootProps) => {
  const { onComponentDropped } = useInteraction();

  console.log('visualEditorData', visualEditorData);

  if (!visualEditorData.root) {
    return React.createElement(
      "div",
      {
        className: cx(styles.root, styles.hover),
        onMouseUp: () => {
          onComponentDropped({ node: { data: { id: 'root' } } });
        }
      },
      []
    );
  }

  return React.createElement(
    "div",
    {
      className: styles.root,
      onMouseUp: () => {
        onComponentDropped({ node: visualEditorData.root });
      }
    },
    visualEditorData.root.children.map((node: any) => (
      <VisualEditorBlock
        key={node.data.id}
        node={node}
        binding={binding}
        boundData={boundData}
      />
    ))
  );
};
