import React from 'react';
import { Row, Col, Typography } from 'antd';
import StatCard from './Stat/StatCard';
import TotalSalesCard from './Stat/TotalSalesCard';
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  StarOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const statData = [
  {
    title: 'Tổng người dùng',
    value: 277,
    change: '+95%',
    color: '#52c41a',
    icon: <UserOutlined style={{ fontSize: 24, color: '#fff' }} />,
    linkTo: '/admin/users',
  },
  {
    title: 'Tổng khóa học đã đăng ký',
    value: 338,
    change: '+30%',
    color: '#eb2f96',
    icon: <ShoppingCartOutlined style={{ fontSize: 24, color: '#fff' }} />,
    linkTo: '/admin/orders',
  },
  {
    title: 'Tổng khóa học',
    value: 557,
    change: '+25%',
    color: '#1890ff',
    icon: <AppstoreOutlined style={{ fontSize: 24, color: '#fff' }} />,
    linkTo: '/admin/courses',
  },
  {
    title: 'Tổng đánh giá khóa học',
    value: 166,
    change: '+45%',
    color: '#faad14',
    icon: <StarOutlined style={{ fontSize: 24, color: '#fff' }} />,
    linkTo: '/admin/ratings',
  },
];

const Dashboard = () => {
  return (
    <>
      <Title level={1} style={{ color: 'black' }}>
        Quản lý thông số
      </Title>
      <Row gutter={[16, 16]}>
        {/* Cột trái: chứa 4 StatCard chia 2 hàng 2 cột */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            {statData.map((item, idx) => (
              <Col xs={24} sm={12} key={idx}>
                <StatCard
                  title={item.title}
                  value={item.value}
                  color={item.color}
                  icon={item.icon}
                  linkTo={item.linkTo}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Cột phải: TotalSalesCard chiếm chiều cao của 2 hàng StatCard */}
        <Col xs={24} lg={8}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'stretch',
            }}
          >
            <TotalSalesCard style={{ height: '100%' }} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
