import { Avatar } from "@material-ui/core";
import React from "react";

import "./SidebarRow.css";

function SidebarRow({ src, Icon, title }) {
  return (
    <div className="sidebarRow">
      {/* Below: if src then Avator...if Icon (capitalized since the prop is a component) then <Icon /> */}

      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
}

export default SidebarRow;
