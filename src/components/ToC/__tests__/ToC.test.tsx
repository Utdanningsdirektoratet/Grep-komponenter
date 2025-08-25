import { render, screen } from '@testing-library/react';
import util from 'node:util';
const { TextEncoder } = util;
globalThis.TextEncoder = TextEncoder;
import React from 'react';
import Standard from '../stories/standard';
import { BrowserRouter } from 'react-router';

/** This test is ONLY a test that the component renders.
 * It does NOT test if a click on a list element moves the scrollbar.
 */
describe('Table of Contents', () => {
  beforeEach(() => {
    render(<Standard />, { wrapper: BrowserRouter });
  });

  it('should render', () => {
    const links = screen.getAllByRole('link');

    expect(links.length).toEqual(10);
  });
});
