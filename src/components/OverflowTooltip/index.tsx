import * as React from 'react';
import { Tooltip } from '@mui/material';

export interface OverflowTooltipProps {
  title: any;
  force?: boolean;
}

interface LocalState {
  overflow: boolean;
}

class OverflowTooltip extends React.Component<
  OverflowTooltipProps,
  LocalState
> {
  private nodeRef = React.createRef<HTMLDivElement>();

  constructor(props: OverflowTooltipProps) {
    super(props);
    this.state = { overflow: false };
  }

  public componentDidMount() {
    const element = this.nodeRef.current;

    if (element) {
      const overflow = element.clientWidth < element.scrollWidth;
      this.setState({ overflow });
    }
  }

  public render() {
    if (this.state.overflow || this.props.force) {
      return (
        <Tooltip placement="left" title={this.props.title || ''}>
          <div style={{ display: 'unset' }} ref={this.nodeRef}>
            {this.props.children}
          </div>
        </Tooltip>
      );
    } else {
      return <div ref={this.nodeRef}>{this.props.children}</div>;
    }
  }
}

export default OverflowTooltip as React.ComponentType<OverflowTooltipProps>;
