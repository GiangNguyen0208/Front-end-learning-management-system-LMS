import React from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import SocialButtons from "./SocialButtons";

function MentorSidebar({ avatar, socialLinks }) {
  return (
    <div className="mentor-sidebar">
      <Avatar size={200} src={avatar} className="mentor-avatar" />
      <SocialButtons links={socialLinks} />
    </div>
  );
}

MentorSidebar.propTypes = {
  avatar: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorSidebar;
