import * as React from "react";
import {
    Container,
    Title,
    StyledList,
    StyledListItem,
    StyledListIcon,
    StyledParentList
} from "./curriculumListStyles";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";

export interface ICurriculum {
    id: number;
    title: string;
    code: string;
    statusId: number;
    locked: boolean;
}

export interface ICurriculumStatus {
    id: number;
    text: string;
}

interface CurriculumListProps {
    title: string;
    curriculums: ICurriculum[];
    statuses: ICurriculumStatus[];
    onCurriculumClick: (args: number) => void;
}

const CurriculumList: React.FC<CurriculumListProps> = props => (
    <Container>
        <Title>{props.title}</Title>
        <StyledList>
            {props.statuses.map((status, index) => (
                <StyledParentList key={index} divider>
                    <ListSubheader>{status.text}</ListSubheader>
                    <StyledList>
                        {props.curriculums.map(c => {
                            if (c.statusId === status.id) {
                                return (
                                    <StyledListItem
                                        key={c.id}
                                        button
                                        onClick={() =>
                                            props.onCurriculumClick(c.id)
                                        }
                                    >
                                        <ListItemText
                                            primary={`${c.code} - ${c.title}`}
                                        />
                                        <StyledListIcon>
                                            {c.locked ? (
                                                <Lock color="primary" />
                                            ) : (
                                                <LockOpen />
                                            )}
                                        </StyledListIcon>
                                    </StyledListItem>
                                );
                            } else return null;
                        })}
                    </StyledList>
                </StyledParentList>
            ))}
        </StyledList>
    </Container>
);

export default CurriculumList as React.ComponentType<CurriculumListProps>;
