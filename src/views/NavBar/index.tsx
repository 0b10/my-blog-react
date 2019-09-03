import React, { useState } from "react";

import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";

export const NavBar = ({ items, routeHandler }: INavBarProps) => {
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

const useTabsStyles = makeStyles({
  root: {
    height: "60px",
    paddingTop: "8px"
  }
});

const useTabStyles = makeStyles({
  root: {
    height: "100%"
  }
});

export interface INavBarProps {
  items: INavItems[];
  routeHandler: TRouteHandler;
}

export interface INavItems {
  path: string;
  text: string;
}

export interface INavItemProps extends INavItems {
  routeHandler: TRouteHandler;
}

export type TRouteHandler = (path: string) => void;
