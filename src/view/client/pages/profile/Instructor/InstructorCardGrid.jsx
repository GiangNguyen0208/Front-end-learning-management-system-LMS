import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import InstructorCard from "./InstructorCard";
import "./css/InstructorCardGrid.css";
import "antd/dist/reset.css";
import { toast } from "react-toastify";
import userApi from "../../../../../api/userApi";

const { Title } = Typography;


const InstructorCardGrid = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await userApi.getAllMentors();
        console.log(response[0].mentorDetail.profilePic);
        if (response) {
          toast.success("Tải danh sách giảng viên thành công.");
          setMentors(response); // hoặc data.mentors nếu backend trả kiểu { mentors: [...] }
        }
      } catch (error) {
        toast.error("Không thể tải danh sách giảng viên.");
        console.error(error);
      }
    };

    fetchMentors();
  }, []);
  return (
    <div className="instructor-grid-container">
      <div className="section-header">
        <Title level={2}>Giảng Viên</Title>
      </div>

      <Row gutter={[24, 24]}>
        {mentors.map((mentor, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={mentor.id || index}>
            <InstructorCard
              mentor={mentor}
              avatar={mentor.mentorDetail.profilePic}
              name={`${mentor.firstName} ${mentor.lastName}`}
              role={mentor.mentorDetail?.profession || "Mentor"}
              students={mentor.mentorDetail?.quantityStudent || 0} // ví dụ minh họa
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstructorCardGrid;
