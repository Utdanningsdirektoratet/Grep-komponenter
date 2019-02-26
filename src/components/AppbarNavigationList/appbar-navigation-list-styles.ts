import withStyles from "@material-ui/core/styles/withStyles";
import MUiList from "@material-ui/core/List";
import MUiListItem from "@material-ui/core/ListItem";
import MUiListItemText from "@material-ui/core/ListItemText";

export const StyledList = withStyles({
  root: {
    display: "inline-flex",
    backgroundColor: "inherit",
    width: "unset"
  }
})(MUiList);

export const StyledListItem = withStyles({
  root: {
    textAlign: "center",
    width: "unset"
  },
  selected: {}
})(MUiListItem);

export const StyledListItemText = withStyles({
  root: {
    paddingRight: 0
  },
  primary: {
    color: "white"
  }
})(MUiListItemText);
