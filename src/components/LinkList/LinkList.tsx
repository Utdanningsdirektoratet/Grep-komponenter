import * as React from "react";
import { Container, Title, StyledListItem, StyledList } from "./linkListStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

export interface IPageLink {
    name: string;
    redirectUrl?: string;
    getLinkIcon?: () => any;
}

interface LinkListProps {
    title: string;
    pages: IPageLink[];
    onPageClick: (redirectUrl?: string) => any;
}

const LinkList: React.FC<LinkListProps> = props => (
    <Container>
        <Title>{props.title}</Title>
        <StyledList>
            {props.pages.map((page, index) => (
                <StyledListItem
                    button
                    divider
                    key={index}
                    onClick={() => props.onPageClick(page.redirectUrl)}
                >
                    {page.getLinkIcon && (
                        <ListItemIcon>{page.getLinkIcon()}</ListItemIcon>
                    )}
                    <ListItemText primary={page.name} />
                </StyledListItem>
            ))}
        </StyledList>
    </Container>
);

export default LinkList as React.ComponentType<LinkListProps>;
