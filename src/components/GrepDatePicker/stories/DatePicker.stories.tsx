import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Box, Container } from '@mui/material';

import { DateTime, DateInput } from '../../../utils';
import GrepDatePicker, { GrepDatePickerProps } from '..';
import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

const TestDatePicker = (
  args: Omit<GrepDatePickerProps, 'value' | 'onChange'>,
) => {
  const [value, setValue] = React.useState<DateInput>(
    args.defaultValue ?? null,
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <GrepDatePicker
        value={value}
        onChange={(date) => {
          setValue(date);
        }}
        {...args}
      />
      {args.defaultValue && (
        <>
          {' '}
          <Button onClick={() => setValue(DateTime('1980-12-17'))}>
            set to 17.12.1980
          </Button>
          <Button onClick={() => setValue(null)}>clear</Button>
        </>
      )}
    </Box>
  );
};

const meta = {
  component: TestDatePicker,
  title: 'DatePicker',
  render: ({ ...args }) => <TestDatePicker {...args} />,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <Container
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
          {storyFn()}
        </LocalizationProvider>
      </Container>
    ),
  ],
} satisfies Meta<typeof TestDatePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithError: Story = {
  name: 'Med feilmelding',
  args: {
    id: 'medFeilmelding',
    label: 'Med feilmelding',
    variant: 'outlined',
    errorMessage: 'Feilmelding',
    defaultValue: dayjs('1993-12-12T23:00:00'),
  },
};
export const WithHelperText: Story = {
  name: 'Med hjelpetekst',
  args: {
    id: 'medHjelpetekst',
    label: 'Med hjelpetekst',
    helperText: 'Hjelpetekst',
    variant: undefined,
  },
};

export const WithMoreControls: Story = {
  name: 'Med flere props',
  args: {
    id: 'FlereProps',
    label: 'test',
    variant: 'filled',
    required: true,
    margin: 'dense',
  },
};
