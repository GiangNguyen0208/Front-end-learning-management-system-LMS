import {
  Card,
  Table,
  Button,
  Upload,
  Modal,
  Typography,
  Space,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  CloudDownloadOutlined,
  FileAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import assignmentApi from "../../../../../api/assignmentApi";
import { toast } from "react-toastify";
import { formatDate } from "../../../../../utils/helper/formatDate";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AuthContext } from "../../../../../context/AuthProvider";

const { Text, Paragraph } = Typography;

const MyCourseAssignments = () => {
  const location = useLocation();
  const { id } = useParams();
  const booking = location.state ? location.state : null;
  const courseId = booking?.courseBooking?.course?.id || id;
  const { user } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal xem chi tiết file
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState(null);

  // Modal nộp bài
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [submitFile, setSubmitFile] = useState(null);

  // Model xem điểm
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);


  // Ref phần nội dung modal để tạo PDF
  const contentRef = useRef();

  useEffect(() => {
    if (courseId) fetchAssignments();
  }, [courseId]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await assignmentApi.fetchAllAssignments(courseId);
      const assignments = res.data;

      const enrichedAssignments = await Promise.all(
        assignments.map(async (assignment) => {
          try {
            const submissionRes = await assignmentApi.getSubmissionsGradedByAssignmentId(assignment.id);
            const submissions = submissionRes.data;

            const scoredSubmission = submissions.find(
              (s) => s?.score !== undefined && s?.score !== null
            );

            return {
              ...assignment,
              graded: !!scoredSubmission,
              score: scoredSubmission?.score ?? null,
            };
          } catch (error) {
            return {
              ...assignment,
              graded: false,
              score: null,
            };
          }
        })
      );

      setAssignments(enrichedAssignments);
    } catch (err) {
      toast.error("Lỗi tải danh sách bài tập.");
    } finally {
      setLoading(false);
    }
  };

  console.log("Assignment Res: ", assignments);

  // Mở modal xem chi tiết
  const handleViewDetails = (record) => {
    setViewingAssignment(record);
    setIsViewModalOpen(true);
  };

  // Mở modal nộp bài
  const handleOpenSubmitModal = (record) => {
    setSubmittingAssignment(record);
    setSubmitFile(null);
    setIsSubmitModalOpen(true);
  };

  // Nộp bài tập (upload file)
  const handleSubmitAssignment = async () => {
    if (!submitFile) {
      toast.warning("Vui lòng chọn file để nộp.");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", user.id);
    formData.append("assignmentId", submittingAssignment.id);

    console.log(submitFile instanceof File);
    console.log("submissionFile ", submitFile);
    
    if (submitFile) {
        formData.append("submissionFile", submitFile.originFileObj ?? submitFile);
    }

    try {
      const response = await assignmentApi.submitAssignment(formData); // API nộp bài
      console.log("Nộp bài ", response.data);
      if (response.data) {
        toast.success("Nộp bài tập thành công.");
        setIsSubmitModalOpen(false);
        setSubmittingAssignment(null);
        setSubmitFile(null);
      } else {
        toast.info("Nộp bài tập thất bại. Vui lòng nộp lại.");
      }
    } catch (err) {
      toast.error("Lỗi khi nộp bài tập.");
    }
  };

  const handleViewScore = async (assignment) => {
    try {
      const res = await assignmentApi.getSubmissionsGradedByAssignmentId(assignment.id);
      setSelectedScore({
        name: assignment.name,
        feedback: res.data[0]?.feedback ?? "Chưa có lời phê",
        score: res.data[0]?.score ?? "Chưa có điểm",
      });
    } catch (err) {
      toast.error("Lỗi tải danh sách bài tập.");
    } finally {
      setLoading(false);
    }

   setIsScoreModalOpen(true);
  };

  // Tạo và tải file PDF chứa thông tin chi tiết bài tập
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
      pdf.save(`ChiTietBaiTap_${viewingAssignment?.id || "assignment"}.pdf`);
    } catch (error) {
      toast.error("Lỗi khi tạo file PDF.");
    }
  };

  const scoredAssignments = assignments.filter((a) => a.graded && a.score !== undefined && a.score !== null);
  const averageScore =
    scoredAssignments.length > 0
      ? (
          scoredAssignments.reduce((acc, a) => acc + a.score, 0) /
          scoredAssignments.length
        ).toFixed(2)
      : null;

  const getClassification = (score) => {
    if (score === null) return "Chưa có đủ điểm để đánh giá";
    if (score < 6.5) return "Trung bình";
    if (score < 8) return "Khá";
    if (score < 9) return "Giỏi";
    return "Xuất sắc";
  };


  const columns = [
    {
      title: "📌 Tiêu đề",
      dataIndex: "name",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "📌 Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "📁 File",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (text, record) => {
        const fileUrl = `https://yourdomain.com/files/${record.assignmentFile}`;
        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Tải về
          </a>
        );
      },
    },
    {
      title: "📊 Trạng thái chấm điểm",
      key: "graded",
      render: (_, record) => (
        <span style={{ color: record.graded ? "green" : "gray", fontWeight: 600 }}>
          {record.graded  ? "✅ Đã chấm" : "⏳ Chưa chấm"}
        </span>
      ),
    },
    {
      title: "📅 Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span style={{ whiteSpace: "nowrap" }}>{formatDate(createdAt)}</span>
      ),
    },
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>⚙️ Hành động</div>
      ),
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              type="primary"
              style={{ backgroundColor: "#1677ff", color: "#fff" }}
            >
              Xem chi tiết
            </Button>
          </Tooltip>

          <Tooltip title="Nộp bài">
            <Button
              icon={<FileAddOutlined />}
              onClick={() => handleOpenSubmitModal(record)}
              type="primary"
              style={{ backgroundColor: "#52c41a", color: "#fff" }}
            >
              Nộp bài
            </Button>
          </Tooltip>

          <Tooltip title="Xem điểm">
            <Button
                icon={<EyeOutlined />}
                onClick={() => handleViewScore(record)}
                type="primary"
                style={{ backgroundColor: "#faad14", color: "#fff" }}
            >
                Xem điểm
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="📚 Danh sách bài tập"
      style={{ maxWidth: 1000, margin: "auto", marginTop: 24 }}
    >
      <Table
        dataSource={assignments}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {averageScore !== null && (
        <Card
          style={{
            marginTop: 24,
            background: "#f6ffed",
            borderColor: "#b7eb8f",
          }}
        >
          <Text strong style={{ fontSize: 16 }}>
            🎯 Điểm trung bình:{" "}
            <Text type="success" style={{ fontSize: 16 }}>
              {averageScore}
            </Text>
          </Text>
          <br />
          <Text strong style={{ fontSize: 16 }}>
            🏆 Xếp loại:{" "}
            <Text type="warning" style={{ fontSize: 16 }}>
              {getClassification(parseFloat(averageScore))}
            </Text>
          </Text>
        </Card>
      )}


      {/* Modal xem chi tiết file */}
      <Modal
        title={`Xem chi tiết bài tập: ${viewingAssignment?.name || ""}`}
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setViewingAssignment(null);
        }}
        footer={[
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Đóng
          </Button>,
          viewingAssignment && (
            <Button
              key="download-pdf"
              type="primary"
              icon={<CloudDownloadOutlined />}
              onClick={handleDownloadPDF}
            >
              Tải thông tin bài tập (PDF)
            </Button>
          ),
        ]}
        width={500}
      >
        <div ref={contentRef} style={{ padding: 10 }}>
          <Paragraph>
            <Text strong>Tiêu đề: </Text> {viewingAssignment?.name}
          </Paragraph>
          <Paragraph>
            <Text strong>Ghi chú: </Text> {viewingAssignment?.note}
          </Paragraph>
        </div>
      </Modal>

      {/* Modal nộp bài tập */}
      <Modal
        title={`Nộp bài cho: ${submittingAssignment?.name || ""}`}
        open={isSubmitModalOpen}
        onCancel={() => {
            setIsSubmitModalOpen(false);
            setSubmittingAssignment(null);
            setSubmitFile(null);
        }}
        footer={[
            <Button
            key="cancel"
            onClick={() => {
                setIsSubmitModalOpen(false);
                setSubmittingAssignment(null);
                setSubmitFile(null);
            }}
            >
            Hủy
            </Button>,
            <Button
            key="submit"
            type="primary"
            icon={<FileAddOutlined />}
            onClick={handleSubmitAssignment}
            disabled={!submitFile}
            >
            Nộp bài
            </Button>,
        ]}
        >
        <Upload
            beforeUpload={(file) => {
            setSubmitFile(file);
            return false; // không tự động upload
            }}
            fileList={submitFile ? [submitFile] : []}
            onRemove={() => setSubmitFile(null)}
            maxCount={1}
        >
            <Button icon={<UploadOutlined />}>Chọn file nộp bài</Button>
        </Upload>
      </Modal>

      <Modal
        title={`🎓 Điểm bài tập: ${selectedScore?.name}`}
        open={isScoreModalOpen}
        onCancel={() => setIsScoreModalOpen(false)}
        footer={[
            <Button key="close" onClick={() => setIsScoreModalOpen(false)}>
            Đóng
            </Button>,
        ]}
        >
        <Paragraph>
            <Text strong>Điểm số:</Text> {selectedScore?.score}
        </Paragraph>
        <Paragraph>
            <Text strong>Lời phê:</Text> {selectedScore?.feedback}
        </Paragraph>
      </Modal>
    </Card>
  );
};

export default MyCourseAssignments;
