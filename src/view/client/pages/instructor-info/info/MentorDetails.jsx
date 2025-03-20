import React from "react";
import PropTypes from "prop-types";
import DetailSection from "./DetailSection";

function MentorDetails({ about, expertise, experience }) {
  return (
    <div className="mentor-details">
      <DetailSection title="About Ronald Richard" content={about} />

      <DetailSection
        title="Areas of Expertise"
        content={expertise}
        isListContent={true}
      />

      <DetailSection title="Professional Experience" content={experience} />
    </div>
  );
}

MentorDetails.propTypes = {
  about: PropTypes.string.isRequired,
  expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
  experience: PropTypes.string.isRequired,
};

export default MentorDetails;
