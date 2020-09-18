import * as React from 'react';
import {
  Container,
  InfoHeader,
  InfoField,
  InfoKey,
  InfoValue,
  HorizontalContainer,
} from './infoContainerStyles';

export interface InfoField {
  key: string;
  value: string;
}

interface InfoProps {
  header?: string;
  inline?: boolean;
  infoFields: InfoField[];
  style?: React.CSSProperties;
}

const renderField = (field: InfoField) => (
  <InfoField key={field.key}>
    <InfoKey>{field.key}:</InfoKey>
    <InfoValue>{field.value}</InfoValue>
  </InfoField>
);

const renderHorizontal = (infoFields: InfoField[]) => (
  <HorizontalContainer>
    {infoFields.map((field: InfoField) => renderField(field))}
  </HorizontalContainer>
);

const renderVertical = (infoFields: InfoField[]) =>
  infoFields.map((field: InfoField) => renderField(field));

const InfoContainer: React.FC<InfoProps> = (props) => (
  <Container style={props.style}>
    {props.header && <InfoHeader>{props.header}</InfoHeader>}
    {props.inline
      ? renderHorizontal(props.infoFields)
      : renderVertical(props.infoFields)}
  </Container>
);

export default InfoContainer as React.ComponentType<InfoProps>;
