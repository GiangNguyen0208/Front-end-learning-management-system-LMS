import React from "react";
import { Layout, Row, Col } from "antd";
import Breadcrumb from "./CourseIntro/Breadcrumb";
import CourseInfo from "./CourseIntro/CourseInfo";
import CourseStats from "./CourseIntro/CourseStats";
import AddToCart from "./AddToCart/AddToCart";
import CourseDetails from "./CourseDetail/CourseDetails";
import TestimonialsSection from "./TestimonialSession/index";
import "./css/styles.css";
import CheckoutHeader from "../checkout/CheckoutHeader";
import SimilarCourses from "./SimilarCourses/SimilarCourses";

const CourseHeader = () => {
  return (
    <Layout.Content className="course-header">
      <CheckoutHeader step={0} />
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24} lg={16}>
          <Breadcrumb />
          <CourseInfo />
          <CourseStats />
          <CourseDetails />
        </Col>
        <Col span={24} lg={8} className="add-to-cart-container">
          <AddToCart />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <TestimonialsSection title="What Our Customer Say About Us"/>
        <SimilarCourses />
      </Row>
    </Layout.Content>
  );
};

export default CourseHeader;
