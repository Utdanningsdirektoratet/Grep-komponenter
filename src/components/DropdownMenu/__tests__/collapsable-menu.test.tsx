import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';

import DropdownMenu, { DropdownMenuItem } from '..';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';

const items: Array<DropdownMenuItem<any>> = [
  {
    label: 'Testitem #1',
    children: [
      {
        label: 'Testitem #1.1',
      },
    ],
  },
  {
    label: 'Testitem #2',
    children: [
      {
        label: 'Testitem #2.1',
      },
    ],
  },
  {
    label: 'Testitem #3',
    disabled: true,
    tooltipText: 'tooltip text',
    children: [
      {
        label: 'Testitem #3.3',
      },
    ],
  },
];

const ButtonMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClickListItem}>Open menu</Button>
      <DropdownMenu
        anchorEl={anchorEl}
        menuItems={items}
        open={!!anchorEl}
        onClose={handleClose}
      />
    </div>
  );
};

const openMenu = async (user: UserEvent) => {
  render(<ButtonMenu />);
  await user.tab(); // focus on button
  await user.keyboard('{Enter}'); // open
};

describe('CollapsableMenu', () => {
  const user = userEvent.setup();
  it('should handle collapse/expand (mouse)', async () => {
    await openMenu(user);
    expect(screen.queryByText('Testitem #1.1')).toBeFalsy();

    const item1 = screen.getByRole('menuitem', { name: 'Testitem #1' });
    const item2 = screen.getByRole('menuitem', { name: 'Testitem #2' });

    await user.click(item1);
    expect(screen.queryByText('Testitem #1.1')).toBeTruthy();

    await user.click(item2);
    expect(screen.queryByText('Testitem #2.1')).toBeTruthy();
    var testitem1 = screen.queryByText('Testitem #1.1');
    if (testitem1) {
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Testitem #1.1'),
      );
    }

    await user.click(item2);
    var testitem2 = screen.queryByText('Testitem #2.1');
    if (testitem2) {
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Testitem #2.1'),
      );
    }
  });

  /*it('should handle collapse/expand (keyboard)', async () => {
    await openMenu(user);
    expect(screen.queryByText('Testitem #1.1')).toBeFalsy();

    await user.keyboard('[ArrowRight]');
    expect(screen.queryByText('Testitem #1.1')).toBeTruthy();

    await user.keyboard('{ArrowLeft}');
    await waitForElementToBeRemoved(screen.queryByText('Testitem #1.1'));

    await waitFor(async () => {
      await user.keyboard('{ArrowRight}');
      expect(screen.queryByText('Testitem #1.1')).toBeTruthy();
    });

    await user.keyboard('{Esc}');
    await waitForElementToBeRemoved(screen.queryByText('Testitem #1.1'));
  });*/

  it('should display tooltip text onMouseOver (if disabled)', async () => {
    await openMenu(user);
    expect(screen.queryByText('tooltip text')).toBeFalsy();

    const item = screen.getByRole('menuitem', { name: items[2].label });
    await user.hover(item.parentElement!);

    expect(await screen.findByText('tooltip text')).toBeInTheDocument();
  });
});
