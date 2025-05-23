import React from "react";
import { Row, Col } from "antd";
import MentorHeader from "./info/MentorHeader";
import MentorDetails from "./info/MentorDetails";
import MentorSidebar from "./info/MentorSidebar";
import CourseRelative from "../course-viewer/CourseRelative";
import { useLocation } from "react-router-dom";
import "./styles.css";

function InstructorInfo() {
  const { state } = useLocation();
  const mentor = state?.mentor || {};
  const ratings = state?.ratings || [];

  console.log("Mentor Info:", mentor);
  

  if (!mentor.mentorDetail) {
    return <div>Đang tải thông tin giảng viên...</div>;
  }

  const fullName = `${mentor.lastName} ${mentor.firstName}`;

  const expertiseList = mentor.mentorDetail.expertise || [
    "Kỹ sư phần mềm",
    "Phát triển ứng dụng web",
    "Thiết kế hệ thống",
    "Tối ưu hiệu suất",
    "Công nghệ hiện đại",
  ];

  return (
    <div className="mentor-page">
      <div className="mentor-container">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={19} lg={19} xl={19}>
            <div className="mentor-info-container">
              <MentorHeader
                name={fullName}
                title={mentor.mentorDetail.profession}
                students={mentor.mentorDetail.quantityStudent}
                course={mentor.mentorDetail.quantityCourse}
              />

              <MentorDetails
                about={mentor.mentorDetail.bio}
                expertise={expertiseList}
                experience={
                <>
                  Với hơn <strong>{mentor.mentorDetail.experience} năm kinh nghiệm</strong> làm việc trong lĩnh vực phát triển phần mềm, tôi đã trực tiếp tham gia phân tích yêu cầu, thiết kế kiến trúc hệ thống, lập trình và triển khai nhiều dự án thực tế, từ ứng dụng web đến hệ thống quản lý dữ liệu, qua đó tích lũy được nền tảng chuyên môn vững chắc cũng như khả năng làm việc nhóm, giải quyết vấn đề và tối ưu hiệu suất phần mềm. Tôi luôn không ngừng cập nhật công nghệ mới, chủ động học hỏi để nâng cao năng lực chuyên môn, đáp ứng yêu cầu kỹ thuật ngày càng cao trong ngành.
                </>
                }
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={5} lg={5} xl={5}>
            <MentorSidebar
              avatar={mentor.mentorDetail.profilePic}
              degree={mentor.mentorDetail.highestQualification}
              age={mentor.mentorDetail.age}
              language={mentor.mentorDetail.languageCertificate}
              certificate={mentor.mentorDetail.selectedCertificate}
              socialLinks={["Website", "LinkedIn"]}
            />
          </Col>
        </Row>

        <div style={{ marginTop: 40 }}>
          <CourseRelative
            title={`Các khóa học khác của ${fullName}`}
            mentor={mentor}
          />
        </div>
      </div>
    </div>
  );
}

export default InstructorInfo;
