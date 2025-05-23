import { Card, Typography, Space } from 'antd';
import React from 'react';
import { DollarCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TotalSalesCard = ({ style }) => {
  const data = [264, 417, 438, 887, 309, 397, 550];
  const config = {
    height: 60,
    autoFit: true,
    data,
    tooltip: false,
    color: '#1890ff',
  };

  return (
    <Card
      style={{
        borderRadius: 16,
        height: '100%',
        background: 'linear-gradient(135deg, #2b6cb0, #6b46c1)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        color: '#fff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style
      }}
      bodyStyle={{
        padding: 24,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      hoverable
    >
      <Space direction="vertical" size={12}>
        <Space align="center" size={8}>
          <DollarCircleOutlined style={{ fontSize: 28, color: '#fff' }} />
          <Title level={3} style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
            Tổng doanh thu
          </Title>
        </Space>

        <Title level={2} style={{ margin: 0, color: '#fff' }}>
          $3,787,681.00
        </Title>

        <Text strong style={{ color: '#95de64', fontSize: 16 }}>
          ▲ +40.63%
        </Text>
        <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
          $3,578.90 trong tháng trước
        </Text>
      </Space>
    </Card>
  );
};

export default TotalSalesCard;
