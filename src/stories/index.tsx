import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Container } from '@mui/material';
import {
  MainLayout,
  AppBar,
  AppBarProfile,
  DropdownMenu,
  AppBarNavList,
  Footer,
  BodyLayout,
  ContainedLinkList,
} from '..';
import { menuItems } from '../components/DropdownMenu/stories/DropDownMenu.stories';
import { navbarPages } from '../components/AppBarNavList/stories/AppBarNavList.stories';
import { footerItems } from '../components/Footer/stories/Footer.stories';
import LinkList from '../components/LinkList';
import GrepTableCard from '../components/GrepTableCard';
import { adminPages } from '../components/LinkList/stories/LinkList.stories';
import { data } from '../components/GrepTableCard/stories/GrepTableCard.stories';
import { tableColumns } from '../components/GrepTable/stories/GrepTable.stories';
import { myPages } from '../components/ContainedLinkList/stories/ContainedLinkList.stories';
import GrepCrumbs from '../components/GrepCrumbs';
import { breadcrumbs } from '../components/GrepCrumbs/stories/GrepCrumbs.stories';
import { renderGDPRText } from '../components/GDPR/stories/GDPR.stories';
import GDPR from '../components/GDPR';
import ProfileInfo from '../components/ProfileInfo';
import { user } from '../components/ProfileInfo/stories/ProfileInfo.stories';
import Sidebar from '../components/Sidebar';

import '../components/NavGuard/stories';
import '../components/SortableTable/stories';
import '../components/GrepDateRange/stories';
import '../components/ToC/stories';

storiesOf('Pages', module)
  .addDecorator((storyFn) => (
    <MainLayout>
      <AppBar>
        <Box display="flex" width="100%" height={64} overflow="hidden">
          <AppBarNavList
            pages={navbarPages}
            selectedPage={navbarPages[0].id}
            onChange={(number) => console.log('index: ', number)}
          />
          <Box marginLeft="auto">
            <AppBarProfile
              userRole={'Superbruker'}
              fullName={'Grep Fagansvarlig'}
              onButtonClick={() => console.log('Button clicked')}
            />
            <DropdownMenu
              open={false}
              anchorEl={null}
              menuItems={menuItems}
              onClose={() => console.log('closing menu')}
            />
          </Box>
        </Box>
      </AppBar>
      <Container>{storyFn()}</Container>
      <Footer
        udirLogo="test"
        udirLink="https://www.udir.no"
        serviceNameText="Tjenestenavn er levert av Utdanningsdirektoratet"
        items={footerItems}
      />
    </MainLayout>
  ))
  .add('Dashboard', () => (
    <Box display="flex">
      <ContainedLinkList
        title={'Mine tilganger'}
        pages={myPages}
        onPageClick={(page) => console.log('clicked on ', page.label)}
      />
      <GrepTableCard
        title={'Mine læreplaner'}
        columns={tableColumns}
        data={data}
        onRowClick={(id) => console.log('clicked on ', id)}
      />
    </Box>
  ))
  .add('Admin', () => (
    <React.Fragment>
      <GrepCrumbs
        breadcrumbs={breadcrumbs}
        onClick={(page) => console.log('clicked on ', page.label)}
      />
      <BodyLayout>
        <LinkList
          title={'Systemadministrasjon'}
          pages={adminPages}
          onPageClick={(page) => console.log('clicked on ', page.label)}
        />
      </BodyLayout>
    </React.Fragment>
  ))
  .add('My profile', () => (
    <BodyLayout>
      <ProfileInfo {...user} />
      <GDPR>{renderGDPRText()}</GDPR>
    </BodyLayout>
  ))
  .add('Læreplaner', () => (
    <Sidebar pages={adminPages} onPageClick={() => console.log('test')} />
  ));
