import { Card, Typography, Badge, Image } from "antd";
import { URL } from "../../api/constant";

const { Title, Text } = Typography;

const CourseSidebar = ({ course }) => {
  const calculateFeeAfterDiscount = (discount, fee) => {
    return (fee - (fee * discount) / 100).toFixed(2);
  };

  const thumbnailUrl = course?.thumbnail
  ? `${URL.BASE_URL}/course/${course.thumbnail}`
  : "/default-image.png"; // Ảnh mặc định

  console.log(`Ảnh được load: ${thumbnailUrl}`);

  const sections = course?.sections || [];
  const totalTopics = sections.reduce((sum, sec) => sum + (sec.courseSectionTopics?.length || 0), 0);

  return (
    <Card className="shadow-lg">
      <Image
        width="100%"
        src={thumbnailUrl}
        alt="Course Thumbnail"
      />

      {course?.type === "Paid" && (
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          <Title level={3} style={{ margin: 0 }}>
            &#8377; {calculateFeeAfterDiscount(course.discountInPercent, course.fee)}
          </Title>
          <Text delete style={{ marginLeft: 10 }}>
            &#8377;{course.fee}
          </Text>
          <Badge count={`${course.discountInPercent}% OFF`} style={{ backgroundColor: "#fab440", marginLeft: 10 }} />
        </div>
      )}

      {course?.type === "Free" && (
        <div style={{ marginTop: 10 }}>
          <Badge count="Miễn phí" style={{ backgroundColor: "green" }} />
        </div>
      )}

      <Title level={4} className="mt-4">Nội dung</Title>
      <Text>+ {sections.length} Chương</Text> <br />
      <Text>+ {totalTopics} Videos</Text> <br />
      <Text>+ Ghi chú</Text>
    </Card>
  );
};

export default CourseSidebar;
