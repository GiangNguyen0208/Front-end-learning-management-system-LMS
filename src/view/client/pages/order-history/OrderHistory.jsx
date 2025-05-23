import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Tag,
  Avatar,
  Space,
  Tooltip,
  Divider,
  Button,
  Modal,
} from 'antd';
import courseApi from '../../../../api/courseApi';
import moment from 'moment';
import { URL } from '../../../../api/constant';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title, Text } = Typography;

const statusColors = {
  pending: 'orange',
  confirmed: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const OrderHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const printRef = useRef();

  const handlePrint = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save(`ChiTietDonHang_${selectedOrder?.id || 'order'}.pdf`);
  };

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await courseApi.getOrderHistory(user.id);
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      render: (_, record) => {
        const { course } = record;
        return (
          <Space>
            <Avatar
              shape="square"
              size={64}
              src={
                course?.thumbnail
                  ? `${URL.BASE_URL}/course/${course.thumbnail}`
                  : undefined
              }
            />
            <div>
              <Text strong>{course?.name || '---'}</Text>
              <div className="text-sm text-gray-500">
                Giảng viên: <strong>{course?.mentor?.firstName} {course?.mentor?.lastName}</strong>
              </div>
              <div className="text-sm text-gray-400">Cấp độ: {course?.level || 'Mọi cấp độ'}</div>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'bookingTime',
      key: 'bookingTime',
      render: (value) => {
        const formattedDate = moment(Number(value)).format('DD/MM/YYYY HH:mm');
        const timeAgo = moment(Number(value)).fromNow();
        return (
          <Tooltip title={formattedDate}>
            <div>
              <Text>{formattedDate}</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>{timeAgo}</Text>
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Thanh toán',
      key: 'amount',
      render: (_, record) => {
        const { amount, discountInPercent } = record;
        const discountedPrice = amount * (1 - discountInPercent / 100);
        return (
          <div>
            {discountInPercent > 0 ? (
              <>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Giá gốc: <Text delete>{Number(amount).toLocaleString()}₫</Text>
                </Text>
                <br />
                <Text strong style={{ color: '#16a34a', fontSize: 15 }}>
                  Giá sau giảm: {Number(discountedPrice).toLocaleString()}₫
                </Text>
                <br />
                <Text type="warning" style={{ fontSize: 12 }}>
                  Đã giảm {discountInPercent}%
                </Text>
              </>
            ) : (
              <Text strong style={{ fontSize: 15 }}>{Number(amount).toLocaleString()}₫</Text>
            )}
          </div>
        );
      },
    },
    {
      title: 'Thanh toán bằng',
      key: 'payment',
      render: (_, record) => {
        const payment = record.payment || {};
        const cardNumber = payment.cardNo || '';
        const cardType = cardNumber.startsWith('4') ? 'Visa' : cardNumber.startsWith('5') ? 'MasterCard' : 'Khác';
        const last4Digits = cardNumber.slice(-4);

        return (
          <Tooltip title={`Số thẻ: ${cardNumber || '---'}`}>
            <Space direction="vertical">
              <Text>{payment.nameOnCard || '---'}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{cardType}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Số thẻ cuối: **** **** **** {last4Digits}
              </Text>
            </Space>
          </Tooltip>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={statusColors[status?.toLowerCase()] || 'default'}
          style={{ fontSize: 14, padding: '4px 12px' }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Chi tiết',
      key: 'action',
      render: (_, record) => (
        <Button icon={<EyeOutlined />} type="link" onClick={() => showModal(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-xl rounded-2xl p-4">
        <Title level={3}>Lịch Sử Đặt Hàng</Title>
        <Divider />
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          size="middle"
        />
      </Card>

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={
          <Button type="primary" icon={<DownloadOutlined />} onClick={handlePrint}>
            Tải PDF
          </Button>
        }
        width={700}
      >
        {selectedOrder && (
          <div ref={printRef} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar
                shape="square"
                size={80}
                src={`${URL.BASE_URL}/course/${selectedOrder.course?.thumbnail}`}
              />
              <div>
                <Text strong style={{ fontSize: 18 }}>{selectedOrder.course?.name}</Text>
                <div className="text-gray-500">
                  Giảng viên: <strong>{selectedOrder.course?.mentor?.firstName} {selectedOrder.course?.mentor?.lastName}</strong>
                </div>
                <div className="text-gray-400">Cấp độ: {selectedOrder.course?.level || 'Mọi cấp độ'}</div>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">Ngày đặt:</Text><br />
                <Text>{moment(Number(selectedOrder.bookingTime)).format('DD/MM/YYYY HH:mm')}</Text>
              </div>

              <div>
                <Text type="secondary">Trạng thái:</Text><br />
                <Tag color={statusColors[selectedOrder.status?.toLowerCase()] || 'default'}>
                  {selectedOrder.status}
                </Tag>
              </div>

              <div>
                <Text type="secondary">Giá gốc:</Text><br />
                <Text delete>{Number(selectedOrder.amount).toLocaleString()}₫</Text>
              </div>

              <div>
                <Text type="secondary">Giá sau giảm:</Text><br />
                <Text strong style={{ color: '#16a34a' }}>
                  {(selectedOrder.amount * (1 - selectedOrder.discountInPercent / 100)).toLocaleString()}₫
                </Text>
              </div>

              <div>
                <Text type="secondary">Tên chủ thẻ:</Text><br />
                <Text>{selectedOrder.payment?.nameOnCard || '---'}</Text>
              </div>

              <div>
                <Text type="secondary">Số thẻ:</Text><br />
                <Text>
                  {selectedOrder.payment?.cardNo
                    ? `**** **** **** ${selectedOrder.payment.cardNo.slice(-4)}`
                    : '---'}
                </Text>
              </div>

              <div className="col-span-2">
                <Text type="secondary">Email người mua:</Text><br />
                <Text>{selectedOrder.customer?.emailId}</Text>
              </div>

              <div className="col-span-2">
                <Text type="secondary">Username người mua:</Text><br />
                <Text>{selectedOrder.customer?.username}</Text>
              </div>
            </div>

            <Divider />

            <div>
              <Text type="secondary">Mô tả khóa học:</Text>
              <p>{selectedOrder.course?.description || 'Không có mô tả'}</p>
            </div>

            <div>
              <Text type="secondary">Ghi chú của giảng viên:</Text>
              <p>{selectedOrder.course?.authorCourseNote || 'Không có ghi chú'}</p>
            </div>

            <div>
              <Text type="secondary">Ghi chú đặc biệt:</Text>
              <p>{selectedOrder.course?.specialNote || 'Không có ghi chú đặc biệt'}</p>
            </div>

            <div>
              <Text type="secondary">Yêu cầu đầu vào:</Text>
              <p>{selectedOrder.course?.prerequisite || 'Không có yêu cầu'}</p>
            </div>

            <div>
              <Text type="secondary">Tài liệu giảng dạy đính kèm:</Text><br />
              {selectedOrder.course?.notesFileName ? (
                <a
                  href={`${URL.BASE_URL}/course/notes/${selectedOrder.course.notesFileName}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {selectedOrder.course.notesFileName}
                </a>
              ) : 'Không có'}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;
