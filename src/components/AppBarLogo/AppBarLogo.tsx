import * as React from 'react';
import { AppTitle, AppEnvironment, AppBarContainer } from './appBarLogoStyles';

export interface AppBarLogoProps {
  title: string;
  environment: string;
  imageSrc: string;
  imageAlt: string;
}

const AppBarLogo: React.FC<AppBarLogoProps> = props => (
  <AppBarContainer>
    <img
      style={{ height: 50, width: 50 }}
      src={props.imageSrc}
      alt={props.imageAlt}
    />
    <AppTitle>{props.title}</AppTitle>
    <AppEnvironment>{props.environment}</AppEnvironment>
  </AppBarContainer>
);

export default AppBarLogo as React.ComponentType<AppBarLogoProps>;
