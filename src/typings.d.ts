interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

export type Dictionary<T> = { [key: string]: T };

export interface FieldProps {
  input?: {
    value: any;
    onChange: (...args) => void;
  };
  meta?: {
    touched: boolean;
    error: any;
  };
  name: string;
  type?: string;
}
