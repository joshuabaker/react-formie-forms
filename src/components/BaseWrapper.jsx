import React, { Children, forwardRef } from 'react';

export const BaseWrapper = forwardRef((props, ref) => {
  if (!Children.count(props.children)) {
    return null;
  }

  return <div ref={ref} {...props} />;
});
