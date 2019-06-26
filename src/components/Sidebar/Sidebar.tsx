import * as React from "react";
import {
    Container,
    BackButton,
    StyledBackIcon,
    StyledButtonText,
    StyledListText
} from "./sidebarStyles";
import { NavigationProps } from "..";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export interface SidebarProps {
    currentPageId?: number;
    pages: NavigationProps[];
    onNavigateBack?: (path?: string) => void;
    onPageClick: (page: NavigationProps) => any;
}

const Sidebar: React.FC<SidebarProps> = props => (
    <Container>
        {props.onNavigateBack && (
            <BackButton
                size="small"
                variant="contained"
                onClick={() => props.onNavigateBack!()}
            >
                <StyledBackIcon />
                <StyledButtonText>Tilbake</StyledButtonText>
            </BackButton>
        )}
        <List>
            {props.pages.map(page => (
                <ListItem
                    button
                    key={page.id}
                    selected={page.id === props.currentPageId}
                    onClick={() => props.onPageClick(page)}
                >
                    <StyledListText primary={page.label} />
                </ListItem>
            ))}
        </List>
    </Container>
);

export default Sidebar as React.ComponentType<SidebarProps>;
