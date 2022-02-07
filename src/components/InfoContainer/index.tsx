import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { Colors } from '../../styling';

export interface InfoFieldType {
  key: string;
  value: string;
}

interface InfoProps {
  header?: string;
  inline?: boolean;
  infoFields: InfoFieldType[];
  style?: React.CSSProperties;
}

const renderField = ({ key, value }: InfoFieldType) => (
  <Box key={key} display="flex" marginRight="20px">
    <Typography
      variant="body1"
      style={{ color: Colors.grey, marginRight: '2rem' }}
    >
      {key}:
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const renderHorizontal = (infoFields: InfoFieldType[]) => (
  <Box display="flex" flexWrap="wrap" justifyContent="space-between">
    {infoFields.map(renderField)}
  </Box>
);

const renderVertical = (infoFields: InfoFieldType[]) =>
  infoFields.map(renderField);

const InfoContainer: React.FC<InfoProps> = (props) => (
  <Box style={{ paddingTop: 20, ...props.style }}>
    {props.header && (
      <Typography variant="h6" style={{ paddingBottom: 10 }}>
        {props.header}
      </Typography>
    )}
    {props.inline
      ? renderHorizontal(props.infoFields)
      : renderVertical(props.infoFields)}
  </Box>
);

export default InfoContainer as React.ComponentType<InfoProps>;
