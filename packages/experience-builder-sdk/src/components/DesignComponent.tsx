import React from 'react';

const designComponentStyle = { display: 'contents' };

// Feel free to do any magic as regards variable definitions for design components
// Or if this isn't necessary by the time we figure that part out, we can bid this part farewell
export const DesignComponent = ({ ...props }) => {
  // Using a display contents so design component content/children
  // can appear as if they are direct children of the div wrapper's parent
  return <div data-test-id="design-component" {...props} style={designComponentStyle} />;
};
