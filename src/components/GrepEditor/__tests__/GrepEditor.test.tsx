import { render, screen } from '@testing-library/react';
import React from 'react';
import GrepEditor from '..';

/** These tests are ONLY test if the component renders.
 * They do NOT test any functionality, because jsdom is missing the contenteditable prop,
 * and this makes it hard to write good tests for adding user input to the editor.
 * https://github.com/jsdom/jsdom/issues/1670
 */
describe('Table of Contents', () => {
  const classname = 'testingClassname';

  it('should render', () => {
    render(<GrepEditor />);
    expect(screen.getByRole('textbox')).toBeDefined();
  });
  it('should get custom css class', () => {
    render(<GrepEditor classes={{ root: classname }} />);
    expect(document.getElementsByClassName(classname).length).toEqual(1);
  });
  it('should display character count', () => {
    render(<GrepEditor showCharCount />);
    expect(screen.getByText('Antall tegn: 0')).toBeDefined();
  });
});
