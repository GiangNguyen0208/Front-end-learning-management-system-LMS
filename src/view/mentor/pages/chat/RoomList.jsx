import React from 'react';
import { Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { AppContext } from '../../../../context/AppProvider';

const { Text, Link } = Typography;

const PanelStyled = styled.div`
  .room-link {
    display: block;
    color: #e0f7fa;
    padding: 10px 14px;
    margin-bottom: 6px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateX(2px);
    }
  }

  .empty-message {
    color: #90a4ae;
    font-style: italic;
    padding: 8px 12px;
  }
`;

const StyledCollapse = styled(Collapse)`
  background-color: transparent;

  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-header {
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    padding: 12px;
    background-color: #263238;
    border-radius: 8px;
  }

  .ant-collapse-content {
    background-color: transparent;
  }
`;

export default function RoomList() {
  const { rooms, setSelectedRoomId } = React.useContext(AppContext);

  const items = [
    {
      key: '1',
      label: <Text style={{ color: '#fff' }}>📁 Danh sách các phòng</Text>,
      children: (
        <PanelStyled>
          {rooms?.length > 0 ? (
            rooms.map((room) => (
              <Link
                key={room.id}
                className="room-link"
                onClick={() => setSelectedRoomId(room.id)}
              >
                # {room.name}
              </Link>
            ))
          ) : (
            <div className="empty-message">Không có phòng nào.</div>
          )}
        </PanelStyled>
      ),
    },
  ];

  return <StyledCollapse ghost defaultActiveKey={['1']} items={items} />;
}
