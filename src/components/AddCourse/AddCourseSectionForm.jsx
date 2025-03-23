import { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import CourseDetails from "./CourseDetails";
import CourseSectionList from "./CourseSectionList";
import AddCourseSectionModal from "./AddCourseSectionModal";
import AddCourseSectionTopicModal from "./AddCourseSectionTopicModal";
import CourseSidebar from "./CourseSidebar";
import { useParams, useNavigate } from "react-router-dom";
import courseApi from "../../api/courseApi";

const AddCourseSectionForm = () => {
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSectionTopicModal, setShowSectionTopicModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      courseApi.getCourseById(courseId)
        .then(response => {
          if (response?.data) {
            setCourseData(response.data);
          } else {
            console.error("Lỗi: API không trả về dữ liệu hợp lệ.");
          }
        })
        .catch(error => console.error("Lỗi khi gọi API:", error));
    } else {
      console.error("Lỗi: courseId không hợp lệ!");
    }
  }, [courseId, courseData?.course?.sections.length]);


  const handleUpdateSections = async (newSection) => {
    try {
      setCourseData((prevData) => ({
        ...prevData,
        course: {
          ...prevData.course,
          sections: [...(prevData.course?.sections || []), newSection]
        }
      }));
      setShowSectionModal(false);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật section:", error.response?.data || error);
    }
  };

  const handleUpdateSectionTopic = async (newTopic) => {
    try {
      setCourseData((prevData) => ({
        ...prevData,
        course: {
          ...prevData.course,
          sections: prevData.course.sections.map((section) =>
            section.id === selectedSectionId
              ? { ...section, topics: [...(section.topics || []), newTopic] }
              : section
          )
        }
      }));
      setShowSectionTopicModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật topic:", error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16, marginLeft: 16 }}
      >
        Go Back
      </Button>
      <div className="row">
        <div className="col-md-7">
          <CourseDetails courseId={courseId} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowSectionModal(true)}>
            Add Chapter
          </Button>
          <CourseSectionList
            sections={courseData?.course?.sections || []}
            showAddTopicModal={(sectionId) => {
              setSelectedSectionId(sectionId); // ✅ Cập nhật ID chương cần thêm chủ đề
              setShowSectionTopicModal(true);
            }}
          />
        </div>
        <div className="col-md-4">
          <CourseSidebar course={courseData?.course} />
        </div>
      </div>

      <AddCourseSectionModal
        visible={showSectionModal}
        onClose={() => setShowSectionModal(false)}
        onSuccess={(sectionData) => handleUpdateSections(sectionData)}
        course={courseData?.course}
      />

      <AddCourseSectionTopicModal
        visible={showSectionTopicModal}
        onClose={() => setShowSectionTopicModal(false)}
        onSuccess={(newTopic) => handleUpdateSectionTopic(newTopic)}
        sectionId={selectedSectionId} // ✅ Truyền sectionId để biết đang thêm vào chương nào
      />
    </div>
  );
};

export default AddCourseSectionForm;