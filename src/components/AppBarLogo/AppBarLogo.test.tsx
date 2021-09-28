import * as React from 'react';
import { render, screen } from '@testing-library/react';

import AppBarLogo from './AppBarLogo';

describe('AppBarLogo', () => {
  beforeEach(() => {
    render(
      <AppBarLogo
        title="TitleTest"
        environment="EnvironmentTest"
        imageSrc="./logo.png"
        imageAlt={'logo.png'}
      />,
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('TitleTest')).toBeVisible();
    expect(screen.getByText('EnvironmentTest')).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByAltText('logo.png')).toBeVisible();
  });
});
