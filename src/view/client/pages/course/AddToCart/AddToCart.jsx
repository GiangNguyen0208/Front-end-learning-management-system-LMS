import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Typography, Space, Divider } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./../css/addToCart.css";

const { Text } = Typography;

const AddToCart = ({
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/489e64e5915bad5e0887c6997f1a17b579d4e89fe6279d0ee062220af4e395e4",
  currentPrice = 49.5,
  originalPrice = 99.5,
  discount = 50,
  onBuyNow,
}) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleAddToCart = () => {
    navigate("/shopping-cart"); // Điều hướng đến trang checkout
  };

  return (
    <Card className="product-card">
      <img src={imageUrl} alt="Product" className="product-image" />

      <div className="price-container">
        <Space className="price-details">
          <Text className="current-price">${currentPrice}</Text>
          <div className="original-price-container">
            <div className="strike-through" />
            <Text className="original-price">${originalPrice}</Text>
          </div>
          <Text className="discount">{discount}% Off</Text>
        </Space>

        <Space direction="vertical" className="button-group">
          <Button type="primary" block className="add-cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </Button>
          <Button block className="buy-now-btn" onClick={onBuyNow}>
            Buy Now
          </Button>
        </Space>
      </div>

      <Divider className="divider" />

      <div className="share-section">
        <Text>Share</Text>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8cd3375628a2d19e34a2bdc59140bca2f452f3ffe1bae02993baccc6ba25b65"
          alt="Share options"
          className="share-image"
        />
      </div>
    </Card>
  );
};

// Định nghĩa kiểu dữ liệu của props bằng PropTypes
AddToCart.propTypes = {
  imageUrl: PropTypes.string,
  currentPrice: PropTypes.number,
  originalPrice: PropTypes.number,
  discount: PropTypes.number,
  onBuyNow: PropTypes.func,
};

export default AddToCart;
