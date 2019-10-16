import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  node?: Element;
}

class Portal extends React.Component<PortalProps> {
  defaultNode: Element = null;

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render() {
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode,
    );
  }
}

export default Portal;
