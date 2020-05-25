import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';

export interface PortalProps {
  children: React.ReactNode;
  node?: Element;
}

const Portal = ({ children, node }: PortalProps) => {
  const defaultNode = useRef<Element | null>(null);

  useEffect(() => {
    return () => {
      if (defaultNode.current) {
        document.body.removeChild(defaultNode.current);
      }
      defaultNode.current = null;
    };
  }, []);

  if (!node && !defaultNode.current) {
    defaultNode.current = document.createElement('div');
    document.body.appendChild(defaultNode.current);
  }

  return ReactDOM.createPortal(children, node || defaultNode.current!);
};

export default Portal;
