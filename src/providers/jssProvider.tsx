import * as React from "react";

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import createGenerateClassName from "@material-ui/core/styles/createGenerateClassName";
import jssPreset from "@material-ui/core/styles/jssPreset";

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: "insertion-point-jss"
});

class JSSProvider extends React.Component {
  public render() {
    const { children } = this.props;
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        {children}
      </JssProvider>
    );
  }
}

export default JSSProvider;
