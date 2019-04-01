import * as React from "react";
import {
    Container,
    Title,
    StyledListItem,
    StyledList
} from "./containedLinkListStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { NavigationProps } from "..";

interface Props {
    title: string;
    pages: NavigationProps[];
    onPageClick: (page: NavigationProps) => void;
}

const ContainedLinkList: React.FC<Props> = props => (
    <Container>
        <Title>{props.title}</Title>
        <StyledList>
            {props.pages.map(page => (
                <StyledListItem
                    button
                    divider
                    key={page.id}
                    onClick={() => props.onPageClick(page)}
                >
                    {page.linkIcon && (
                        <ListItemIcon>{page.linkIcon}</ListItemIcon>
                    )}
                    <ListItemText primary={page.label} />
                </StyledListItem>
            ))}
        </StyledList>
    </Container>
);

export default ContainedLinkList as React.ComponentType<Props>;
