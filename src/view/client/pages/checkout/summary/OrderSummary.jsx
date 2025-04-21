import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Divider, List, Avatar, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarCircleOutlined, GiftOutlined, ShoppingOutlined } from "@ant-design/icons";
import { formatFeeToVND } from "../../../../../utils/helper/formatFeeToVND"; // Giả sử bạn đã định nghĩa hàm này trong utils
import { values } from "lodash";
import { toast } from "react-toastify";
import courseApi from "../../../../../api/courseApi";

const { Title, Text } = Typography;

const OrderSummary = ({ formValues }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    price: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  const courseIds = cartItems.map(item => item.id);
  const user = JSON.parse(localStorage.getItem("user")) || {}; // Giả sử bạn đã lưu thông tin người dùng trong localStorage

  const navigate = useNavigate();

  // Hàm tính toán tóm tắt đơn hàng
  const calculateOrderSummary = (cart) => {
    const price = cart.reduce((acc, item) => acc + item.price, 0);
    const discount = cart.reduce(
      (acc, item) => acc + (item.originalPrice - item.price),
      0
    );
    const tax = Math.round(price * 0.1); // Thuế giả sử là 10%
    const total = price + tax - discount;

    setOrderSummary({
      price: formatFeeToVND(price),
      discount: `-${formatFeeToVND(discount)}`,
      tax: formatFeeToVND(tax),
      total: formatFeeToVND(total),
    });
  };

  // Load cart data và tính toán tóm tắt đơn hàng mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateOrderSummary(storedCart);
  }, []); // Chạy lần đầu khi component mount

  // Lắng nghe sự thay đổi của cartItems và cập nhật lại tóm tắt đơn hàng
  useEffect(() => {
    calculateOrderSummary(cartItems);
  }, [cartItems]); // Cập nhật khi cartItems thay đổi

  // Chuyển tiền từ dạng format VNĐ sang số.
  // Chuyển lên Server ko bị lỗi.
  const parseCurrencyToNumber = (currencyStr) => {
    return Number(currencyStr.replace(/[^\d]/g, ""));
  };

  const handleConfirmPayment = async () => {
    const { nameOnCard, cardNo, cvv, expiryDate } = formValues;
    const amount = parseCurrencyToNumber(orderSummary.total); // lấy từ OrderSummary hoặc localStorage
    try {
      const response = await courseApi.bookingCourse({
        nameOnCard,
        cardNo,
        cvv,
        expiryDate,
        courseIds,
        amount,
        customerId: user.id,
      });
  
      console.log("Booking response:", response.data);
      toast.success("Thanh toán thành công!");
      localStorage.removeItem("cart");
      navigate("/payment-success");
  
    } catch (error) {
      console.error("Lỗi khi gọi bookingCourse:", error);
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  }


  return (
    <Card
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: 16,
      }}
    >
      <Title level={3} style={{ marginBottom: 16 }}>
        Đơn hàng của bạn
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            // actions={[
            //   <Button type="link" onClick={() => handleRemove(item.id)}>
            //     Xóa
            //   </Button>,
            // ]}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} src={item.thumbnail} />}
              title={<Text strong>{item.title}</Text>}
              description={
                <Space direction="vertical" size={0}>
                  <Text>Số lượng: 1</Text>
                  <Text>
                    Giá:{" "}
                    <Text delete>{formatFeeToVND(item.originalPrice)}</Text>{" "}
                    <Text type="danger">{formatFeeToVND(item.price)}</Text>
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <DollarCircleOutlined /> Tạm tính
          </Text>
          <Text strong>{orderSummary.price}</Text>
        </Space>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <GiftOutlined /> Giảm giá
          </Text>
          <Text strong type="danger">
            {orderSummary.discount}
          </Text>
        </Space>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <ShoppingOutlined /> Thuế
          </Text>
          <Text strong>{orderSummary.tax}</Text>
        </Space>

        <Divider style={{ margin: "12px 0" }} />

        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text strong>Tổng cộng</Text>
          <Text strong style={{ fontSize: 18 }}>
            {orderSummary.total}
          </Text>
        </Space>
      </div>

      <Button
        type="primary"
        block
        size="large"
        style={{ marginTop: 20, borderRadius: 8 }}
        onClick={handleConfirmPayment}
      >
        Xác nhận thanh toán
      </Button>
    </Card>
  );
};

export default OrderSummary;
