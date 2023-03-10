import { Fragment } from "react";
import { Divider, Icon, List, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { UserItem } from "styles/user";
import { userSidebarOptions } from "../data";
import SidebarTop from "./SidebarTop/SidebarTop";
import MyOrders from "components/UserStatus/MyOrders/MyOrders";

const Sidebar = () => {
  return (
    <>
      <SidebarTop />
      <Divider sx={{ borderColor: "common.panelBorderGrey" }} />

      <MyOrders sidebar={true} />
      <Divider sx={{ borderColor: "common.panelBorderGrey", display: { md: "none" } }} />
      <List>
        {userSidebarOptions.map(({ id, title, route, icon }) => (
          <Fragment key={id}>
            {title === "settings" && <Divider sx={{ marginY: "10px" }} />}
            <UserItem className={title === "Status" ? "hidden" : ""}>
              <NavLink to={route} className={`link`}>
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                  primary={title}
                />
              </NavLink>
            </UserItem>
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
