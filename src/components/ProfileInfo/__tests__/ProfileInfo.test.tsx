import * as React from 'react';
import { render } from '@testing-library/react';

import ProfileInfo from '..';

describe('ProfileInfo', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(
      <ProfileInfo
        firstName="firstNameTest"
        lastName="lastNameTest"
        email="emailTest"
        phoneNumber="phoneNumberTest"
        role="roleTest"
      />,
    );

    const firstName = getByLabelText(/fornavn/i);
    const lastName = getByLabelText(/etternavn/i);
    const email = getByLabelText(/e-post adresse/i);
    const phone = getByLabelText(/telefonnummer/i);
    const role = getByLabelText(/rolle/i);

    expect(firstName).toBeVisible();
    expect(firstName).toBeDisabled();
    expect(firstName).toHaveValue('firstNameTest');
    expect(firstName).toHaveClass('MuiOutlinedInput-input');

    expect(lastName).toBeVisible();
    expect(lastName).toBeDisabled();
    expect(lastName).toHaveValue('lastNameTest');
    expect(lastName).toHaveClass('MuiOutlinedInput-input');

    expect(email).toBeVisible();
    expect(email).toBeDisabled();
    expect(email).toHaveValue('emailTest');
    expect(email).toHaveClass('MuiOutlinedInput-input');

    expect(phone).toBeVisible();
    expect(phone).toBeDisabled();
    expect(phone).toHaveValue('phoneNumberTest');
    expect(phone).toHaveClass('MuiOutlinedInput-input');

    expect(role).toBeVisible();
    expect(role).toBeDisabled();
    expect(role).toHaveValue('roleTest');
    expect(role).toHaveClass('MuiOutlinedInput-input');
  });
});
