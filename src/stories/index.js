import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import AppBar from "../components/AppBar";
import AppbarNavigationList from "../components/AppbarNavigationList";
import MainLayout from "../components/MainLayout";
import CenterLayout from "../components/CenterLayout";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf("AppBar", module).add("standard", () => <AppBar />);

const pages = [
  {
    id: 1,
    label: "home",
    onClick: url => console.log("going to url: ", url),
    toUrl: "/home"
  },
  {
    id: 2,
    label: "groups",
    onClick: url => console.log("going to url: ", url),
    toUrl: "/groups"
  },
  {
    id: 3,
    label: "curriculums",
    onClick: url => console.log("going to url: ", url),
    toUrl: "/curriculums"
  }
];

storiesOf("AppbarNavigationList", module).add("with theme and appbar", () => (
  <AppBar>
    <AppbarNavigationList pages={pages} selectedPage={0} />
  </AppBar>
));

storiesOf("MainLayout", module).add("MainLayout with content", () => (
  <MainLayout>
    <div style={{ height: 500, width: 500, backgroundColor: "grey" }} />
  </MainLayout>
));

storiesOf("CenterLayout", module).add("CenterLayout with content", () => (
  <MainLayout>
    <CenterLayout>
      <div
        style={{
          display: "flex",
          height: 500,
          width: 500,
          backgroundColor: "grey"
        }}
      />
    </CenterLayout>
  </MainLayout>
));
