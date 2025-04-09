import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Typography, Space, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./../css/addToCart.css";
import { URL } from "../../../../../api/constant";
import courseApi from "../../../../../api/courseApi";

const { Text } = Typography;

const AddToCart = ({ course }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage

  if (!course || !user) return null;

  const { id, name, thumbnail, fee, discountInPercent } = course;

  const originalPrice = fee;
  const currentPrice =
    fee === 0 ? 0 : Math.round(fee - (fee * discountInPercent) / 100);
  const isFree = fee === 0;

  const thumbnailUrl = `${URL.BASE_URL}/course/${thumbnail}`;

  const handleAddToCart = () => {
    if (isFree) {
      message.info("Khoá học này miễn phí!");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseAlreadyAdded = existingCart.some((item) => item.id === id);

    if (!courseAlreadyAdded) {
      existingCart.push({
        id,
        name,
        currentPrice,
        originalPrice,
        thumbnailUrl,
      });
      localStorage.setItem("cart", JSON.stringify(existingCart));
      message.success("Đã thêm vào giỏ hàng!");
    } else {
      message.warning("Khoá học đã có trong giỏ hàng.");
    }

    // navigate("/shopping-cart");
  };

  const handleBuyNow = async () => {
    if (isFree) {
      try {
        const response = await courseApi.bookingCourseFree(id, user.id);
        if (response.data?.success) {
          message.success("Đã đăng ký khoá học miễn phí!");
          // navigate(`/course/${id}/learn`);
        } else {
          message.warning(response.data?.responseMessage || "Đăng ký không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi đăng ký khoá học miễn phí:", error);
        message.error("Đăng ký khoá học thất bại!");
      }
      return;
    }

    localStorage.setItem("buyNow", JSON.stringify(course));
    navigate("/checkout");
  };

  return (
    <Card className="product-card">
      <img src={thumbnailUrl} alt={name} className="product-image" />

      <div className="price-container">
        {isFree ? (
          <Text className="current-price" style={{ color: "green", fontSize: "18px" }}>
            Miễn phí
          </Text>
        ) : (
          <Space className="price-details">
            <Text className="current-price">${currentPrice}</Text>
            {discountInPercent > 0 && (
              <>
                <div className="original-price-container">
                  <div className="strike-through" />
                  <Text className="original-price">${originalPrice}</Text>
                </div>
                <Text className="discount">{discountInPercent}% Off</Text>
              </>
            )}
          </Space>
        )}

        <Space direction="vertical" className="button-group">
          <Button
            type="primary"
            block
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={isFree}
          >
            Add To Cart
          </Button>
          <Button block className="buy-now-btn" onClick={handleBuyNow}>
            {isFree ? "Học ngay" : "Buy Now"}
          </Button>
        </Space>
      </div>

      <Divider className="divider" />

      <div className="share-section">
        <Text>Share</Text>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8cd3375628a2d19e34a2bdc59140bca2f452f3ffe1bae02993baccc6ba25b65"
          alt="Share"
          className="share-image"
        />
      </div>
    </Card>
  );
};

AddToCart.propTypes = {
  course: PropTypes.object.isRequired,
};

export default AddToCart;
