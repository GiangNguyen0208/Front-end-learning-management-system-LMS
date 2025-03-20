import { useState } from "react";
import { Button, Modal, Card, List, Avatar, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CourseDetails from "./CourseDetails";
import CourseSectionList from "./CourseSectionList";
import AddCourseSectionModal from "./AddCourseSectionModal";
import AddCourseSectionTopicModal from "./AddCourseSectionTopicModal";
import CourseSidebar from "./CourseSidebar";

const AddCourseSectionForm = ({ course }) => {
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSectionTopicModal, setShowSectionTopicModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-7">
          <CourseDetails course={course} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowSectionModal(true)}>
            Add Chapter
          </Button>
          <CourseSectionList
            sections={course.sections}
            onAddTopic={(sectionId) => {
              setSelectedSectionId(sectionId);
              setShowSectionTopicModal(true);
            }}
          />
        </div>
        <div className="col-md-4">
          <CourseSidebar course={course} />
        </div>
      </div>
      
      <AddCourseSectionModal
        visible={showSectionModal}
        onClose={() => setShowSectionModal(false)}
        courseId={course.id}
      />
      <AddCourseSectionTopicModal
        visible={showSectionTopicModal}
        onClose={() => setShowSectionTopicModal(false)}
        sectionId={selectedSectionId}
      />
    </div>
  );
};

export default AddCourseSectionForm;
