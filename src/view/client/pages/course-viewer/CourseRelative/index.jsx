import React, { useRef } from "react";
import { Row, Col, Typography } from "antd";
import NavigationButtons from "./NavigationButtons";
import { datalist } from "./js/data";
import { scrollContainer } from "../../../../../utils/helper/scrollContainerHelper";
import "./css/testimonial.css";
import CourseCard from "../../../components/Courses/CourseCard";

const { Title } = Typography;

const CourseRelative = ({title}) => {
  const containerRef = useRef(null);

  const handleNavigation = (direction) => {
    scrollContainer(containerRef, direction);
  };

  return (
    <section className="testimonials-section">
      <Row
        className="testimonials-header"
        justify="space-between"
        align="middle"
      >
        <Col>
          <Title
            level={2}
            style={{ margin: 0, fontSize: 24, lineHeight: "34px" }}
          >
            {title}
          </Title>
        </Col>
        <Col>
          <NavigationButtons onNavigate={handleNavigation} />
        </Col>
      </Row>

      <div className="testimonials-container" ref={containerRef}>
        <Row gutter={16} wrap={false} style={{ display: "flex", width: "1296px" }}>
          {datalist.map((data) => (
            <Col key={data.id} style={{ flex: "0 0 432px" }}>
              <CourseCard {...data} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default CourseRelative;
