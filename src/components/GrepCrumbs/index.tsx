import React from 'react';
import { Link, Box, Tooltip } from '@mui/material';
import { useStyles } from './styles/styles';
import { useNavigate } from 'react-router-dom';

export interface Breadcrumb {
  path?: string;
  label: string;
}

interface Props {
  style?: React.CSSProperties;
  breadcrumbs: Breadcrumb[];
  onClick?: (crumb: Breadcrumb) => void;
}

const isOverflowing = (e: HTMLElement) => e.offsetWidth < e.scrollWidth;

const GrepCrumbs: React.FC<Props> = ({
  style,
  onClick,
  breadcrumbs,
}: Props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    const { current } = ref;
    setShowTooltip(!!current && isOverflowing(current));
  }, [ref]);

  const handleClick = (crumb: Breadcrumb): void => {
    if (onClick) {
      onClick(crumb);
    } else {
      crumb.path && navigate(crumb.path);
    }
  };

  return (
    <div className={classes.container} style={style}>
      {breadcrumbs.map((crumb, index) =>
        crumb.path ? (
          <Box key={index} display="flex">
            <Link
              className={classes.link}
              tabIndex={0}
              component="button"
              onClick={(): void => handleClick(crumb)}
            >
              {crumb.label}
            </Link>
            {index !== breadcrumbs.length - 1 && (
              <Box margin="auto 8px" height="fit-content" /*lineHeight="20px"*/>
                &gt;
              </Box>
            )}
          </Box>
        ) : (
          <Tooltip key={index} title={showTooltip ? crumb.label : ''}>
            <div className={classes.current} ref={ref}>
              {crumb.label}
            </div>
          </Tooltip>
        ),
      )}
    </div>
  );
};

export default GrepCrumbs;
