import React from "react";
import { Card, Typography, Row, Col, Image } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const sections = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png", // Hình ảnh icon bảo mật
    title: "Chính sách bảo mật",
    description:
      "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu đều được mã hóa và không chia sẻ với bên thứ ba nếu không có sự đồng ý của bạn.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1042/1042330.png", // Hình ảnh icon điều khoản sử dụng
    title: "Điều khoản sử dụng",
    description:
      "Việc sử dụng nền tảng LMS đồng nghĩa với việc bạn đồng ý tuân thủ các quy định, bao gồm không chia sẻ tài khoản và không vi phạm nội dung học.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png", // Hình ảnh icon thanh toán
    title: "Thanh toán & Hoàn tiền",
    description:
      "Chúng tôi hỗ trợ nhiều hình thức thanh toán. Nếu bạn không hài lòng với khóa học, có thể yêu cầu hoàn tiền trong vòng 7 ngày.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png", // Hình ảnh icon khóa học
    title: "Chính sách khóa học",
    description:
      "Khóa học phải được hoàn thành trong thời hạn quy định. Sau khi hoàn thành, bạn sẽ được cấp chứng nhận tương ứng.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/564/564619.png", // Hình ảnh icon xử lý vi phạm
    title: "Xử lý vi phạm",
    description:
      "Tài khoản vi phạm nội quy có thể bị cảnh cáo, tạm khóa hoặc xóa vĩnh viễn tùy theo mức độ vi phạm.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5977/5977587.png", // Hình ảnh icon hỗ trợ
    title: "Liên hệ & Hỗ trợ",
    description:
      "Mọi thắc mắc hoặc hỗ trợ xin liên hệ qua email support@lms.com hoặc số điện thoại 0123 456 789.",
  },
];

const PolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 16px" }}
    >
      <Title level={2} style={{ textAlign: "center" }}>Chính sách & Điều khoản</Title>
      <Paragraph style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
        Trang này giải thích rõ các chính sách của hệ thống LMS nhằm bảo vệ quyền lợi của người dùng, đảm bảo trải nghiệm học tập và minh bạch trong sử dụng dịch vụ.
      </Paragraph>

      <Row gutter={[24, 32]}>
        {sections.map((section, index) => (
          <Col xs={24} md={12} key={index}>
            <Card hoverable style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Image src={section.icon} alt={section.title} width={32} />
                <Title level={4} style={{ margin: 0 }}>{section.title}</Title>
              </div>
              <Paragraph>{section.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default PolicyPage;
