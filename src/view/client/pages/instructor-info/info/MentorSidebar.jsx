import React, { useContext, useEffect, useState } from "react";
import { Avatar, Divider, Image } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import SocialButtons from "./SocialButtons";
import { URL } from "../../../../../api/constant";
import "./MentorSidebar.css"; // Thêm file CSS riêng cho style đẹp
import { AuthContext } from "../../../../../context/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

function MentorSidebar({ avatar, degree, age, language, certificate, socialLinks }) {
  const {userFireBase} = useContext(AuthContext);
  const [certificateUrl, setCertificateUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userFireBase?.uid) return;

      try {
        const userRef = doc(db, "users", userFireBase.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.selectedCertificate) {
            setCertificateUrl(userData.selectedCertificate);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userFireBase]);

  console.log("certificateUrl ", certificateUrl);
  

  return (
    <div className="mentor-sidebar-container">
      <div className="mentor-avatar-wrapper">
        <Avatar
          size={200}
          src={avatar ? `${URL.BASE_URL}/user/${avatar}` : "https://via.placeholder.com/200"}
          className="mentor-avatar"
        />
      </div>

      <div className="mentor-info-section">
        <div className="mentor-info-item">
          <IdcardOutlined /> <strong>Trình độ học vấn:</strong> {degree}
        </div>

        <div className="mentor-info-item">
          <CalendarOutlined /> <strong>Tuổi:</strong> {age}
        </div>

        <div className="mentor-info-item">
          <FileProtectOutlined /> <strong>Chứng chỉ ngôn ngữ:</strong> {language}
        </div>

        {certificateUrl && (
          <div className="mentor-certificate">
            <Divider />
            <strong><FileProtectOutlined /> Hình ảnh Chứng chỉ:</strong>
            <Image
              src={certificateUrl}
              alt="certificate"
              className="mentor-certificate-img"
              width="100%"
              preview={{ mask: "Nhấn để phóng to" }}
            />
          </div>
        )}
      </div>

      <Divider />
      <SocialButtons links={socialLinks} />
    </div>
  );
}

MentorSidebar.propTypes = {
  avatar: PropTypes.string.isRequired,
  degree: PropTypes.string,
  age: PropTypes.number,
  language: PropTypes.string,
  certificate: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorSidebar;
