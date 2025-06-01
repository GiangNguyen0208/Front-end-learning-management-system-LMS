// components/SubmittedAssignments.jsx
import { Card, Table, Tag, Button, InputNumber, Modal, message, Typography } from "antd";
import { use, useContext, useEffect, useState } from "react";
import submissionApi from "../../../../../api/assignmentApi";
import { formatDate } from "../../../../../utils/helper/formatDate";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import AuthContext from "../../../../../context/AuthProvider";

const SubmittedAssignments = ({ assignmentId, onBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [visible, setVisible] = useState(false);

  // const mentor = JSON.parse(localStorage.getItem("user"));

  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingSubmission, setViewingSubmission] = useState(null);


  useEffect(() => {
    if (assignmentId) fetchSubmissions();
  }, [assignmentId]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await submissionApi.getSubmissionsByAssignmentId(assignmentId);
      setSubmissions(res.data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách bài nộp:", error);
    } finally {
      setLoading(false);
    }
  };

  const openScoreModal = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score || 0);
    setVisible(true);
  };

  const handleSubmitScore = async () => {
    try {
      await submissionApi.gradeSubmission(selectedSubmission.id, {
        score,
        feedback, // gửi thêm feedback
      });
      toast.success("Đã chấm điểm thành công!");
      setVisible(false);
      fetchSubmissions(); // Refresh
    } catch (error) {
      console.error("Chấm điểm thất bại:", error);
      toast.error("Có lỗi khi chấm điểm!");
    }
  };

  const handleDownloadSubmission = () => {
    if (viewingSubmission?.submissionFile) {
        const link = document.createElement("a");
        link.href = viewingSubmission.submissionFile;
        link.setAttribute("download", `Submission_${viewingSubmission.student.username}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        toast.warning("Không tìm thấy file bài nộp!");
    }
  };

  const columns = [
    {
      title: "👤 Học sinh",
      key: "student",
      render: (_, record) => {
        const { student } = record;
        return `${student.firstName} ${student.lastName}`;
      },
    },
    {
      title: "📁 File nộp",
      dataIndex: "submissionFile",
      key: "fileUrl",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Xem file
          </a>
        ) : (
          "Chưa nộp"
        ),
    },
    {
      title: "📅 Thời gian nộp",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => formatDate(createAt),
    },
    {
      title: "📊 Điểm số",
      dataIndex: "score",
      key: "score",
      render: (score) => (score !== null ? `${score}/10` : "Chưa chấm"),
    },
    {
      title: "🎯 Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "GRADED" ? "green" : "orange"}>
          {status === "GRADED" ? "Đã chấm" : "Chưa chấm"}
        </Tag>
      ),
    },
    {
      title: "⚙️ Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={() => {
                setViewingSubmission(record);
                setIsViewModalOpen(true);
            }}>
                Xem chi tiết
            </Button>
            <Button type="primary" onClick={() => openScoreModal(record)}>
                {record.status === "GRADED" ? "Sửa điểm" : "Chấm điểm"}
            </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        title="📥 Danh sách bài học sinh đã nộp"
        extra={<Button onClick={onBack}>⬅️ Quay lại</Button>}
        style={{ maxWidth: 1000, margin: "auto", marginTop: 24 }}
      >
        <Table
          dataSource={submissions}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        open={visible}
        title={`🔎 Chấm điểm: ${selectedSubmission?.student.firstName} ${selectedSubmission?.student.lastName}`}
        onCancel={() => setVisible(false)}
        onOk={handleSubmitScore}
        okText="Lưu điểm"
        >
        <p>Nhập điểm (0 - 10):</p>
        <InputNumber
            min={0}
            max={10}
            value={score}
            onChange={setScore}
            style={{ width: "100%", marginBottom: 16 }}
        />

        <p>Nhận xét (tuỳ chọn):</p>
        <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{ width: "100%" }}
            placeholder="Ghi nhận xét về bài nộp..."
        />
      </Modal>


      <Modal
        open={isViewModalOpen}
        title={`📄 Chi tiết bài nộp: ${viewingSubmission?.student.firstName} ${viewingSubmission?.student.lastName}`}
        onCancel={() => {
            setIsViewModalOpen(false);
            setViewingSubmission(null);
        }}
        footer={[
            <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Đóng
            </Button>,
            viewingSubmission?.submissionFile && (
            <Button
                key="download"
                type="primary"
                icon={<CloudDownloadOutlined />}
                onClick={handleDownloadSubmission}
            >
                Tải bài nộp
            </Button>
            ),
        ]}
        width={500}
        >
        <Typography.Paragraph>
            <Typography.Text strong>👤 Học sinh:</Typography.Text>{" "}
            {viewingSubmission?.student?.firstName} {viewingSubmission?.student?.lastName}
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>📅 Thời gian nộp:</Typography.Text>{" "}
            {formatDate(viewingSubmission?.createAt)}
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>📊 Điểm:</Typography.Text>{" "}
            {viewingSubmission?.score != null ? `${viewingSubmission.score}/10` : "Chưa chấm"}
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>📁 Link file:</Typography.Text>{" "}
            {viewingSubmission?.submissionFile ? (
            <a href={viewingSubmission.submissionFile} target="_blank" rel="noopener noreferrer">
                Xem bài nộp
            </a>
            ) : (
            "Không có file"
            )}
        </Typography.Paragraph>
        </Modal>

    </>
  );
};

export default SubmittedAssignments;
