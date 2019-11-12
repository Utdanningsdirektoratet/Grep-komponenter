import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/styles/makeStyles";

export const useStyles = makeStyles(({ palette }: Theme) =>
    createStyles({
        container: {
            padding: 10,
            display: "flex",
            flexDirection: "column"
        },
        item: {
            cursor: "pointer",

            "&:hover": {
                background: "unset"
            }
        },
        text: {
            color: palette.text.hint,
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: 16,

            "&:hover": {
                color: palette.primary.main
            }
        },
        selected: {
            color: palette.primary.main,
            whiteSpace: "nowrap",
            fontSize: 16,
            fontWeight: 500
        }
    })
);
