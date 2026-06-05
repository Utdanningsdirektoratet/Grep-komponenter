import React, { useState } from 'react';
import Sidebar, { SidebarProps } from '..';
import { NavigationProps } from '../../AppBarNavList';
import Assignment from '@mui/icons-material/Assignment';
import type { Meta, StoryObj } from '@storybook/react-vite';

export const adminPages: NavigationProps[] = [
  {
    id: 1,
    label: 'Informasjon om læreplan',
    toUrl: '/service-messages',
  },
  {
    id: 6,
    label: 'Test',
    children: [
      {
        id: 7,
        label: 'Hmm',
      },
    ],
  },
  {
    id: 2,
    label: 'Kompetansemålsett',
    toUrl: '/manage-users',
    linkIcon: <Assignment />,
  },
  {
    id: 3,
    label: 'Oversettelser',
    children: [
      {
        id: 4,
        label: 'Child 1-1',
        linkIcon: <Assignment />,
      },
      {
        id: 5,
        label: 'Child 1-2',
      },
    ],
  },
];

const SidebarWithHooks = (
  args: Omit<SidebarProps, 'currentPageId' | 'onPageClick'>,
) => {
  const [pageId, setPageId] = useState<number>();
  return (
    <Sidebar
      currentPageId={pageId}
      onPageClick={(page, event) => (
        setPageId(page.id),
        console.log(`${page.label} - mouse button ${event?.button ?? 'N(A'}`)
      )}
      {...args}
    />
  );
};

const meta = {
  component: SidebarWithHooks,
  title: 'Sidebar',
  excludeStories: ['adminPages'],
  args: { pages: adminPages },
  render: ({ ...args }) => <SidebarWithHooks {...args} />,
} satisfies Meta<typeof SidebarWithHooks>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
  name: 'Standard',
};

export const ExpandAndClick: Story = {
  args: {
    expandOnIcon: true,
  },
  name: 'Expand on icon only',
};
