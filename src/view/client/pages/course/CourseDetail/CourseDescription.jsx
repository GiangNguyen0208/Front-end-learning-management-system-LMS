import React from "react";
import { Typography } from "antd";
import { DescriptionSection, SectionTitle, SectionText } from "../js/styles";

const { Title, Paragraph } = Typography;

const CourseDescription = () => {
  return (
    <DescriptionSection>
      <SectionTitle>Course Description</SectionTitle>
      <SectionText>
        This interactive e-learning course will introduce you to User Experience
        (UX) design, the art of creating products and services that are
        intuitive, enjoyable, and user-friendly. Gain a solid foundation in UX
        principles and learn to apply them in real-world scenarios through
        engaging modules and interactive exercises.
      </SectionText>

      <SectionTitle>Certification</SectionTitle>
      <SectionText>
        At Byway, we understand the significance of formal recognition for your
        hard work and dedication to continuous learning. Upon successful
        completion of our courses, you will earn a prestigious certification
        that not only validates your expertise but also opens doors to new
        opportunities in your chosen field.
      </SectionText>
    </DescriptionSection>
  );
};

export default CourseDescription;