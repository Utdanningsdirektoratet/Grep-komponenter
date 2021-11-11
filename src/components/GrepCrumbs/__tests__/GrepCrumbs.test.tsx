// import * as React from 'react';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { push } from 'connected-react-router';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import GrepCrumbs, { Breadcrumb } from '..';

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Test #1',
    path: '/test-1',
  },
  {
    label: 'Test #2',
    path: '/test-2',
  },
];

const store = createStore(() => {});
const origDispatch = store.dispatch;
store.dispatch = jest.fn(origDispatch);
const mockFn = jest.fn();

const renderComponent = (onClick?: boolean) => {
  render(
    <Provider store={store}>
      <GrepCrumbs
        breadcrumbs={breadcrumbs}
        onClick={onClick ? mockFn : undefined}
      />
    </Provider>,
  );
};

describe('GrepCrumbs', () => {
  it('should render correctly', () => {
    renderComponent();
  });

  it('should handle onClick', () => {
    renderComponent();

    userEvent.click(screen.getByRole('button', { name: breadcrumbs[0].label }));
    expect(store.dispatch).toHaveBeenCalledWith(
      store.dispatch(push(breadcrumbs[0].path!)),
    );
  });

  it('should handle custom onClick', () => {
    renderComponent(true);

    userEvent.click(screen.getByRole('button', { name: breadcrumbs[0].label }));
    expect(mockFn).toHaveBeenCalledWith(breadcrumbs[0]);
  });

  // TODO: not working at the moment
  // it('should handle text overflow', () => {
  //   const useRefSpy = jest
  //     .spyOn(React, 'useRef')
  //     .mockReturnValueOnce({ current: { offsetWidth: 50, scrollWidth: 50 } });

  //   renderComponent();

  //   useRefSpy.mockReturnValueOnce({
  //     current: { offsetWidth: 50, scrollWidth: 100 },
  //   });
  // });
});
