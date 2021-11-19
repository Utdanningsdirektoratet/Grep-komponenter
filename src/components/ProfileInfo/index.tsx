import * as React from 'react';
import { Box, TextField } from '@mui/material';

import { useStyles } from './styles';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const renderField = (id: string, label: string, value: string) => (
  <TextField
    id={id}
    disabled
    label={label}
    value={value}
    variant="outlined"
    style={{ margin: '10px 0' }}
    InputProps={{ style: { color: 'rgb(84, 84, 84)' } }}
  />
);

const ProfileInfo: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      {renderField('firstname', 'Fornavn', props.firstName)}
      {renderField('lastname', 'Etternavn', props.lastName)}
      {renderField('email', 'E-post adresse', props.email)}
      {renderField('phone', 'Telefonnummer', props.phoneNumber)}
      {renderField('role', 'Rolle', props.role)}
    </Box>
  );
};

export default ProfileInfo as React.ComponentType<Props>;
