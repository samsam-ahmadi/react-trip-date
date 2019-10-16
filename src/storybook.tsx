import * as React from 'react';

export interface FieldSimulatorProps {
  component: any;
  [otherProps: string]: any;
}

export const FieldSimulator: React.FunctionComponent<FieldSimulatorProps> = ({
  component: Component,
  ...props
}) => {
  const [value, setValue] = React.useState(props.defaultValue || '');
  return (
    <Component
      {...props}
      input={{
        value,
        onChange: e => setValue(typeof e === 'object' ? e.target.value : e),
      }}
    />
  );
};
