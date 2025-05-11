import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import CourseFilters from './CourseFilters';
import CourseGrid from './CourseGrid';
import './styles.css';
import InstructorSection from './../../components/Instructor/InstructorSection';
import CourseSection from '../../components/Courses/CourseSection';
import { useNavigate } from 'react-router-dom';
import courseApi from '../../../../api/courseApi';
import HeaderSearch from '../../../../components/Header/HeaderSearch';

const { Title } = Typography;

const Categories = () => {
  const [courseSection, setCourseSection] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    try {
      const response = await courseApi.getCoursesByStatus("Active", "No");
      setCourseSection(response.data.courseDTOs);
      setFilteredCourses(response.data.courseDTOs);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    if (!value) {
      fetchAllCourses();
      return;
    }
    try {
      const response = await courseApi.getCoursesByName(value);
      setCourseSection(response.data.courses);
      setFilteredCourses(response.data.courses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  // 📌 Xử lý lọc tại đây
  const handleFilterChange = (filters) => {
    const { types, priceRanges, sortOrder, selectedCategories } = filters;

    let result = [...courseSection];

    // Lọc theo loại khóa học
    if (types.length > 0) {
      result = result.filter((c) => types.includes(c.type));
    }

    // Lọc theo khoảng giá
    if (priceRanges.length > 0) {
      result = result.filter((c) => {
        return priceRanges.some((range) => {
          if (range === "free") return c.fee === 0;
          if (range === "lt5m") return c.fee > 0 && c.fee < 5000000;
          if (range === "5to10m") return c.fee >= 5000000 && c.fee <= 10000000;
          if (range === "gt10m") return c.fee > 10000000;
          return false;
        });
      });
    }

    // Lọc theo thứ tự sắp xếp
    if (sortOrder === "a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === "low-high") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.fee - a.fee);
    }

    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.categoryName));
    }

    setFilteredCourses(result);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <Layout.Content className="course-list-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
      <Title level={1}>Khóa học</Title>

      <div className="course-section">
        <Title level={2}>Tất cả các khóa học</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <CourseFilters courses={courseSection} onFilterChange={handleFilterChange} />
          </Col>
          <Col xs={24} lg={18}>
            <HeaderSearch onSearch={handleSearch} />
            <CourseGrid courses={filteredCourses} />
          </Col>
        </Row>
      </div>

      <InstructorSection />
      <CourseSection />
    </Layout.Content>
  );
};

export default Categories;
