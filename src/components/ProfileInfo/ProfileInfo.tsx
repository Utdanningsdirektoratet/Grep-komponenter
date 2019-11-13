import * as React from 'react';
import { ProfileField, Container } from './profileInfoStyles';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const renderField = (label: string, value: string) => (
  <ProfileField
    disabled
    label={label}
    value={value}
    variant="outlined"
    InputProps={{ style: { color: 'rgb(84, 84, 84)' } }}
  />
);

const ProfileInfo: React.FC<Props> = props => (
  <Container>
    {renderField('Fornavn', props.firstName)}
    {renderField('Etternavn', props.lastName)}
    {renderField('E-post adresse', props.email)}
    {renderField('Telefonnummer', props.phoneNumber)}
    {renderField('Rolle', props.role)}
  </Container>
);

export default ProfileInfo as React.ComponentType<Props>;
