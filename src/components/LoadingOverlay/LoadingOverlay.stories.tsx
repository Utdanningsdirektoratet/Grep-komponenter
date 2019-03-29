import * as React from "react";
import { storiesOf } from "@storybook/react";
import LoadingOverlay from "./LoadingOverlay";

storiesOf("LoadingOverlay", module).add("standard", () => <LoadingOverlay />);
