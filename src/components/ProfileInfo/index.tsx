import * as React from 'react';
import { ProfileField, Container } from './styles';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const renderField = (id: string, label: string, value: string) => (
  <ProfileField
    id={id}
    disabled
    label={label}
    value={value}
    variant="outlined"
    InputProps={{ style: { color: 'rgb(84, 84, 84)' } }}
  />
);

const ProfileInfo: React.FC<Props> = (props) => (
  <Container>
    {renderField('firstname', 'Fornavn', props.firstName)}
    {renderField('lastname', 'Etternavn', props.lastName)}
    {renderField('email', 'E-post adresse', props.email)}
    {renderField('phone', 'Telefonnummer', props.phoneNumber)}
    {renderField('role', 'Rolle', props.role)}
  </Container>
);

export default ProfileInfo as React.ComponentType<Props>;
