import * as React from 'react';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Colors } from '../../styling';

import { IconBox, HelpText, Outer, StyledInput } from './searchBarStyles';

interface SearchBarProps {
  helpText?: string;
  outlined?: boolean;
  autoFocus?: boolean;
  initValue?: string;
  placeholder?: string;
  searchAllText?: string;
  onClear: () => void;
  onSearchAll?: () => void;
  onInputChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState(props.initValue || '');

  React.useEffect(() => {
    if (props.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const _handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const newVal = event.target.value;
    setValue(newVal);
    props.onInputChange(newVal);
  };

  const _handleClear = () => {
    setValue('');
    props.onClear();
  };

  return (
    <React.Fragment>
      <Outer
        style={{
          border: props.outlined ? `1px solid ${Colors.lightGrey}` : 0,
        }}
      >
        <IconBox>
          <Search />
        </IconBox>
        <StyledInput
          value={value}
          inputRef={inputRef}
          onChange={_handleChange}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          InputProps={{ disableUnderline: true, fullWidth: true }}
        />
        <IconBox style={{ cursor: 'pointer' }}>
          {!!value.length && <Close onClick={_handleClear} />}
        </IconBox>
      </Outer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.helpText && <HelpText>{props.helpText}</HelpText>}
        {props.searchAllText && props.onSearchAll && (
          <Button color="primary" onClick={props.onSearchAll}>
            {props.searchAllText}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchBar as React.ComponentType<SearchBarProps>;
