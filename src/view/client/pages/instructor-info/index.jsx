import React from "react";
import { Row, Col } from "antd";
import MentorHeader from "./info/MentorHeader";
import MentorDetails from "./info/MentorDetails";
import MentorSidebar from "./info/MentorSidebar";
import "./styles.css";
import CourseRelative from "../course-viewer/CourseRelative";
import LearnerReviews from "./reviews/LearnerReviews";

function InstructorInfo() {
  const mentorData = {
    name: "Giang Truong Nguyen",
    title: "Web developer, UX/UI Designer, and Teacher",
    stats: {
      students: 1000,
      reviews: 154
    },
    about: "Ronald Richard is a highly skilled UX/UI Designer with over a decade of experience in crafting user-centric digital solutions. With a background in graphic design and a keen eye for detail, Ronald specializes in creating intuitive interfaces that delight users and drive business results.",
    expertise: [
      "User Experience (UX) Design",
      "User Interface (UI) Design",
      "Information Architecture",
      "Interaction Design",
      "Visual Design",
      "Usability Testing",
      "Wireframing and Prototyping",
      "Design Thinking"
    ],
    experience: "Ronald Richard has an extensive professional background in UX/UI design, having worked with renowned companies such as [Company Name] and [Company Name]. His portfolio includes a diverse range of projects spanning web applications, mobile apps, and e-commerce platforms.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/122b68c3e436ed2a70381d3229cd6b4d5a04b3b8596c47a4322a9b6a6c23a834?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
    socialLinks: ["Website", "Twitter", "Youtube"]
  };

  return (
    <div className="mentor-page">
      <div className="mentor-container">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={19} lg={19} xl={19}>
            <div className="mentor-info-container">
              <MentorHeader
                name={mentorData.name}
                title={mentorData.title}
                students={mentorData.stats.students}
                reviews={mentorData.stats.reviews}
              />

              <MentorDetails
                about={mentorData.about}
                expertise={mentorData.expertise}
                experience={mentorData.experience}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={5} lg={5} xl={5}>
            <MentorSidebar
              avatar={mentorData.avatar}
              socialLinks={mentorData.socialLinks}
            />
          </Col>
          <Row gutter={20}>
            <CourseRelative title="More Courses by Giang Truong Nguyen" />
            <LearnerReviews />
          </Row>
        </Row>
      </div>
    </div>
  );
}

export default InstructorInfo;
