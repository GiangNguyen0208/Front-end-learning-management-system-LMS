import React from "react";
import { Card, Typography, Button } from "antd";
import CourseItem from "./CourseItem";
import CouponSection from "./CouponSection";
import PriceBreakdown from "./PriceBreakdown";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const OrderSummary = () => {
  const navigate = useNavigate();
  const courseData = {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/44107296341a91f9d2a9595375b06ac0912d6ef5ce64b48a9d22abacf56a5dde",
    category: "Design",
    title: "Introduction to User Experience Design",
    meta: "155 Lectures . 22 Total Hours",
    price: "45.00",
  };

  const prices = {
    subtotal: "300.00",
    discount: "10.00",
    tax: "20.00",
    total: "290.00",
  };

  const handleCheckout = () => {
    navigate("/order-complete");
  }

  return (
    <Card className="order-summary-card">
      <Title level={4}>Order Details</Title>

      <Card className="course-card">
        <CourseItem course={courseData} />
      </Card>

      <CouponSection />
      <PriceBreakdown prices={prices} />

      <Button type="primary" block size="large" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </Card>
  );
};

export default OrderSummary;
