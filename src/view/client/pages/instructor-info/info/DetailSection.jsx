import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Paragraph } = Typography;

function DetailSection({ title, content, isListContent = false }) {
  return (
    <div className="detail-section">
      <Title level={4} className="section-title">
        {title}
      </Title>
      {isListContent ? (
        <Paragraph className="section-content">
          {content.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < content.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Paragraph>
      ) : (
        <Paragraph className="section-content">{content}</Paragraph>
      )}
    </div>
  );
}

DetailSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  isListContent: PropTypes.bool,
};

export default DetailSection;
