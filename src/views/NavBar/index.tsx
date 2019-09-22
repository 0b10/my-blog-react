import React, { useState } from "react";

import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";

// >>> STYLES >>>
const useTabsStyles = makeStyles({
  root: {
    height: "60px",
    paddingTop: "8px",
  },
});

const useTabStyles = makeStyles({
  root: {
    height: "100%",
  },
});

// >>> COMPONENTS >>>
export const NavBar = ({ items, routeHandler }: NavBarProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => setSelectedTab(newValue);

  return (
    <AppBar position="sticky" data-testid="navbar">
      <Tabs classes={tabsClasses} value={selectedTab} onChange={handleTabChange}>
        {items.map(({ path, text }, index) => (
          <Tab
            classes={tabClasses}
            disableRipple
            label={text}
            onClick={() => routeHandler(path)}
            key={index}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

// >>> INTERFACES >>>
export interface NavBarProps {
  items: NavItems[];
  routeHandler: RouteHandler;
}

export interface NavItems {
  path: string;
  text: string;
}

export interface NavItemProps extends NavItems {
  routeHandler: RouteHandler;
}

export type RouteHandler = (path: string) => void;
