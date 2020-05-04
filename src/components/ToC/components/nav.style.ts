import { makeStyles, createStyles } from '@material-ui/core/styles';
import { convertToRgba } from '../../../styling';

export const useStyles = makeStyles(() => {
    return createStyles({
        root: {
            fontSize: 18,
            overflowY: 'scroll',
            outline: 'none'
        },
        keyboardHint: {
            position: "relative",
            '&::after': {
                content: '"innholdsfortegnelse: [ alt + i ]"',
                fontSize: 12,
                position: 'absolute',
                display: 'block',
                top: 5,
                right: 5,
                background: convertToRgba("#000", .1),
                padding: "2px 5px"
            }
        }
    });
});

export default useStyles;
