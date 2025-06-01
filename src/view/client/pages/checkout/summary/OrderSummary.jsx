import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Button,
  Divider,
  List,
  Avatar,
  Space,
  Modal,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  DollarCircleOutlined,
  GiftOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { formatFeeToVND } from "../../../../../utils/helper/formatFeeToVND";
import { toast } from "react-toastify";
import courseApi from "../../../../../api/courseApi";

const { Title, Text } = Typography;

const OrderSummary = ({ formValues }) => {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [vnpayLoading, setVnpayLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    price: 0,
    discount: 0,
    total: 0,
  });

  const courseIds = cartItems.map((item) => item.id);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  const calculateOrderSummary = (cart) => {
    const price = cart.reduce((acc, item) => acc + item.price, 0);
    const discount = cart.reduce(
      (acc, item) => acc + (item.originalPrice - item.price),
      0
    );
    const total = price;

    setOrderSummary({
      price: formatFeeToVND(price),
      discount: `-${formatFeeToVND(discount)}`,
      total: formatFeeToVND(total),
    });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateOrderSummary(storedCart);
  }, []);

  useEffect(() => {
    calculateOrderSummary(cartItems);
  }, [cartItems]);

  const parseCurrencyToNumber = (currencyStr) => {
    return Number(currencyStr.replace(/[^\d]/g, ""));
  };

  const handleOpenOtpModal = async () => {
    try {
      await courseApi.sendOtpToEmail(user.emailId);
      toast.success("Đã gửi mã OTP đến email.");
      setIsOtpModalVisible(true);
    } catch (error) {
      toast.error("Gửi OTP thất bại!");
      console.error("Error sending OTP:", error);
    }
  };

  const handleConfirmPayment = async () => {
    if (!otp) {
      toast.error("Vui lòng nhập mã OTP!");
      return;
    }

    const { nameOnCard, cardNo, cvv, expiryDate } = formValues;
    const amount = parseCurrencyToNumber(orderSummary.total);
    const formattedAmount = parseFloat(amount).toFixed(2);

    setLoading(true);
    try {
      await courseApi.bookingCourse({
        nameOnCard,
        cardNo,
        cvv,
        expiryDate,
        courseIds,
        amount: formattedAmount,
        customerId: user.id,
        otpConfirm: otp,
      });

      toast.success("Thanh toán thành công!");
      localStorage.removeItem("cart");
      setIsOtpModalVisible(false);
      navigate("/payment-success");
    } catch (error) {
      toast.error("Thanh toán thất bại. Vui lòng kiểm tra mã OTP.");
      console.error("Lỗi khi booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVNPayPayment = async () => {
    setVnpayLoading(true);
    try {
      const amount = parseCurrencyToNumber(orderSummary.total) * 100; // Chuyển sang đơn vị VNPay (VND * 100)
      const response = await courseApi.bookingByVNPay(courseIds, user.id, amount);

      if (response.data && response.data.success) {
        window.location.href = response.data.responseMessage; // Chuyển hướng đến URL thanh toán VNPay
      } else {
        toast.error("Không thể tạo URL thanh toán VNPay!");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối với VNPay: " + error.message);
      console.error("Lỗi VNPay:", error);
    } finally {
      setVnpayLoading(false);
    }
  };

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
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} src={item.thumbnail} />}
              title={<Text strong>{item.title}</Text>}
              description={
                <Space direction="vertical" size={0}>
                  <Text>Số lượng: 1</Text>
                  <Text>
                    Giá: <Text delete>{formatFeeToVND(item.originalPrice)}</Text>{" "}
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
        onClick={handleOpenOtpModal}
        loading={loading}
      >
        Xác nhận thanh toán
      </Button>
      <Button
        type="default"
        block
        size="large"
        style={{ marginTop: 10, borderRadius: 8 }}
        onClick={handleVNPayPayment}
        loading={vnpayLoading}
        icon={<CreditCardOutlined />}
      >
        Thanh toán bằng VNPay
      </Button>
      <Modal
        title={`Nhập mã OTP đã gửi đến email: ${user.emailId}`}
        open={isOtpModalVisible}
        onOk={handleConfirmPayment}
        onCancel={() => setIsOtpModalVisible(false)}
        confirmLoading={loading}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <Input
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </Card>
  );
};

export default OrderSummary;