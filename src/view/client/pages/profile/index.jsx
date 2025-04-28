import React, { useState } from "react";
import { Row, Col, Layout } from "antd";
import ProfileSidebar from "./SideBar/ProfileSidebar";
import ProfileForm from "./Profile/Form/ProfileForm";
import ImageUpload from "./Profile/ImageUpload/ImageUpload";
import SocialLinks from "./Profile/SocialLinks/SocialLinks";
import SearchFilter from "./SearchFilter/CourseSearch";
import "./styles.css";
import CourseGrid from "../categories/CourseGrid";
import ReviewList from "./Reviews/ReviewList";
import InstructorCardGrid from "./Instructor/InstructorCardGrid";
import MessageList from "./Message/MessageList";
import MyCourses from "./MyCourses/MyCourses";

const { Content } = Layout;

function Infomation() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const formData = new FormData();
    // const courses = [
    //     {
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },
    //     {
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },{
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },{
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },{
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },{
    //       id: 1,
    //       imageUrl:
    //         "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    //       title: "Beginner's Guide to Design",
    //       instructor: "Ronald Richards",
    //       rating: 4.9,
    //       ratingCount: 1200,
    //       details: "22 Total Hours. 155 Lectures. Beginner",
    //       price: 149.9,
    //     },
    //   ];
      
      const [selectedMenu, setSelectedMenu] = useState("profile");

      const renderContent = () => {
        switch (selectedMenu) {
          case "profile":
            return (
                <>
                  <ProfileForm user={user}  />
                  <ImageUpload user={user} />
                  <SocialLinks />
                </>
            );
          case "courses":
            return (
                <>
                  <MyCourses courses={courses}/>
                </>
            );
          case "teachers":
            return (
                <>
                  <SearchFilter title="Instructors" />
                  <InstructorCardGrid />
                </>
            );
          case "reviews":
            return (
                <>
                  <ReviewList />
                </>
            );
          case "message":
            return (
              <>
                  <SearchFilter title="Message" />
                  <MessageList />
              </>
            )
          default:
            return  (
                <>
                  <ProfileForm user={user} />
                  <ImageUpload />
                  <SocialLinks />
                </>
            );
        }
      };
  return (
    <Layout className="profile-page">
      <Content className="profile-content">
        <div className="profile-container">
          <Row gutter={[20, 40]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <ProfileSidebar setSelectedMenu={setSelectedMenu} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <div className="profile-main-content">
                {renderContent()}
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default Infomation;
