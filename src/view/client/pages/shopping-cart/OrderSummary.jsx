import React from "react";
import { Typography, Card, Button, Divider } from "antd";
import styles from "./ShoppingCart.module.css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OrderSummary = ({ orderSummary }) => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate("/check-out")
    }

  return (
    <Card className={styles.orderSummary}>
      <Title level={3}>Order Details</Title>
      <div className={styles.summaryContent}>
        <div className={styles.summaryRow}>
          <Text>Price</Text>
          <Text strong>{orderSummary.price}</Text>
        </div>
        <div className={styles.summaryRow}>
          <Text>Discount</Text>
          <Text strong type="danger">
            {orderSummary.discount}
          </Text>
        </div>
        <div className={styles.summaryRow}>
          <Text>Tax</Text>
          <Text strong>{orderSummary.tax}</Text>
        </div>
        <Divider />
        <div className={styles.summaryRow}>
          <Text strong>Total</Text>
          <Text strong>{orderSummary.total}</Text>
        </div>
      </div>
      <Button
        type="primary"
        block
        size="large"
        className={styles.checkoutButton}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </Card>
  );
};

export default OrderSummary;
