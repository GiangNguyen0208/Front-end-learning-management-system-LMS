import { Card, Typography, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const StatCard = ({ title, value, change, icon, color, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <Card
      hoverable
      style={{
        backgroundColor: color,
        borderRadius: 12,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      bodyStyle={{ padding: 20, flexGrow: 1 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <Title level={2} style={{ color: '#fff' }}>{title}</Title>
          <Title level={3} style={{ margin: '5px 0', color: '#fff' }}>
            {value}
          </Title>
          {/* Bạn có thể thêm phần change ở đây nếu muốn */}
        </div>
        <div>{icon}</div>
      </div>

      <Button
        type="primary"
        ghost
        style={{
          borderColor: 'white',
          color: 'white',
        }}
        onClick={handleClick}
      >
        Xem chi tiết
      </Button>
    </Card>
  );
};

export default StatCard;
