import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Empty,
  Spin,
  Row,
  Col,
  Button,
  Modal,
  Space,
  Card,
} from "antd";
import { SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import CourseRatingForm from "../course/CourseRatingForm";
import MyCourseCard from "../profile/MyCourses/MyCourseCard";
import { AuthContext } from "../../../../context/AuthProvider";
import { toast } from "react-toastify";
import courseApi from "../../../../api/courseApi";

const { Title, Text } = Typography;

const MyCourseRatingsPage = () => {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await courseApi.fetchCourseByCustomerId(user.id);
        setMyCourses(response.data.bookings || []);
      } catch (err) {
        console.error("Lỗi tải khóa học:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [user.id]);

  const handleOpenRating = (courseBooking) => {
    setSelectedCourse(courseBooking.course);
    setRatingModalVisible(true);
  };

  return (
    <div style={{ padding: 32, background: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Đánh giá khóa học đã mua
      </Title>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", minHeight: 300 }}>
          <Spin size="large" />
        </div>
      ) : myCourses.length === 0 ? (
        <Empty
          imageStyle={{ height: 120 }}
          image="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          description={
            <>
              <Text type="secondary" style={{ fontSize: 16 }}>
                Bạn chưa mua khóa học nào!
              </Text>
              <br />
              <SmileOutlined style={{ fontSize: 24, marginTop: 12 }} />
            </>
          }
        >
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="large"
            onClick={() => (window.location.href = "/categories")}
          >
            Khám phá khóa học
          </Button>
        </Empty>
      ) : (
        <Row gutter={[24, 24]}>
          {myCourses.map((booking) => (
            <Col xs={24} sm={12} md={8} lg={6} key={booking.id}>
              <Card
                hoverable
                style={{ borderRadius: 10 }}
                bodyStyle={{ padding: 16 }}
                cover={<MyCourseCard courseBooking={booking} />}
              >
                <Button
                  type="primary"
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => handleOpenRating(booking)}
                >
                  Đánh giá khóa học
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={`Đánh giá: ${selectedCourse?.name}`}
        open={ratingModalVisible}
        onCancel={() => setRatingModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedCourse && (
          <CourseRatingForm
            courseId={selectedCourse.id}
            user={user}
            onSubmitSuccess={() => {
              setRatingModalVisible(false);
              toast.success("Cảm ơn bạn đã đánh giá!");
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default MyCourseRatingsPage;
