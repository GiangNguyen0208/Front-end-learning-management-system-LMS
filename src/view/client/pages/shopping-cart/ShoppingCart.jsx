import React from "react";
import { Layout, Typography, Row, Col, Divider } from "antd";
import { RightOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import styles from "./ShoppingCart.module.css";
import CheckoutHeader from "../checkout/CheckoutHeader";

const { Title, Text } = Typography;

const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      title: "Introduction to User Experience Design",
      instructor: "John Doe",
      rating: 4.6,
      totalRatings: 250,
      duration: "22 Total Hours",
      lectures: "155 Lectures",
      level: "All levels",
      price: "$45.00",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/533c73d6c597c1f523f70edd6b453b45a83dc5f75a4b1a9d7d962829dda91c96",
    },
    {
        id: 1,
        title: "Introduction to User Experience Design",
        instructor: "John Doe",
        rating: 4.6,
        totalRatings: 250,
        duration: "22 Total Hours",
        lectures: "155 Lectures",
        level: "All levels",
        price: "$45.00",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/533c73d6c597c1f523f70edd6b453b45a83dc5f75a4b1a9d7d962829dda91c96",
      },
  ];

  const orderSummary = {
    price: "$300.00",
    discount: "-$10.00",
    tax: "$20.00",
    total: "$290.00",
  };

  return (
    <Layout.Content className={styles.shoppingCart}>
      <CheckoutHeader step={1} />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className={styles.header}>
            <Title level={2}>Shopping Cart</Title>
            <div className={styles.breadcrumb}>
              <Text>Categories</Text>
              <RightOutlined />
              <Text>Details</Text>
              <RightOutlined />
              <Text type="primary">Shopping Cart</Text>
            </div>
          </div>

          <Text className={styles.cartCount}>1 Course in cart</Text>
          <Divider />

          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Col>

        <Col xs={24} lg={8}>
          <OrderSummary orderSummary={orderSummary} />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default ShoppingCart;
