import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  StarOutlined,
} from '@ant-design/icons';

export const statData = [
  {
    title: 'Total Users',
    value: 277,
    change: '+95%',
    color: '#52c41a',
    icon: <UserOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
  {
    title: 'Total Orders',
    value: 338,
    change: '+30%',
    color: '#eb2f96',
    icon: <ShoppingCartOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
  {
    title: 'Total Products',
    value: 557,
    change: '+25%',
    color: '#1890ff',
    icon: <AppstoreOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
  {
    title: 'Total Reviews',
    value: 166,
    change: '+45%',
    color: '#faad14',
    icon: <StarOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
];
