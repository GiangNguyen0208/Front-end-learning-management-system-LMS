import { Card, Typography, Badge } from "antd";

const { Title, Text } = Typography;

const CourseSidebar = ({ course }) => {
  const calculateFeeAfterDiscount = (discount, fee) => {
    return (fee - (fee * discount) / 100).toFixed(2);
  };

  const sections = course?.sections || []; // Đảm bảo sections không bị undefined
  const totalTopics = sections.reduce((sum, sec) => sum + (sec.courseSectionTopics?.length || 0), 0);

  return (
    <Card className="shadow-lg">
      <img
        src={`${URL.BASE_URL}/course/${course?.thumbnail || "default-thumbnail.jpg"}`}
        alt="Course Thumbnail"
        style={{ width: "100%", borderRadius: "10px" }}
      />

      {course?.type === "Paid" && (
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          <Title level={3} style={{ margin: 0 }}>
            &#8377; {calculateFeeAfterDiscount(course.discountInPercent, course.fee)}
          </Title>
          <Text delete style={{ marginLeft: 10 }}>
            &#8377;{course.fee}
          </Text>
          <Badge
            count={`${course.discountInPercent}% OFF`}
            style={{ backgroundColor: "#fab440", marginLeft: 10 }}
          />
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
