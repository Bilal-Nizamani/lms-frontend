import React from "react";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: React.FC<Props> = ({
  user,
  active,
  avatar,
  logOutHandler,
  setActive,
}) => {
  return <div>SideBarProfile</div>;
};

export default SideBarProfile;
