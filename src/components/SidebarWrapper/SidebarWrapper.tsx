import * as React from "react";
import { WhiteSpace, Container } from "./sidebarWrapperStyles";
import Sidebar, { SidebarProps } from "../Sidebar";
import RootRef from "@material-ui/core/RootRef/RootRef";

interface Props extends SidebarProps {}

interface LocalState {
    sidebarWidth: number;
}

class SidebarWrapper extends React.Component<Props, LocalState> {
    private SidebarRef = React.createRef<HTMLElement>();

    constructor(props: Props) {
        super(props);
        this.state = { sidebarWidth: 0 };
    }

    public componentDidMount() {
        this.setState({
            sidebarWidth: this.SidebarRef.current!.offsetWidth
        });
    }

    public render() {
        return (
            <Container>
                <RootRef rootRef={this.SidebarRef}>
                    <Sidebar {...this.props} />
                </RootRef>
                {this.props.children}
                <WhiteSpace style={{ width: this.state.sidebarWidth }} />
            </Container>
        );
    }
}

export default SidebarWrapper as React.ComponentType<Props>;
