import { Routes, Route } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import ChatRoom from "../view/mentor/pages/chat/index";
import AdminLayout from "../view/admin/layout/AdminLayout";
import AdminDashboard from "../view/admin/pages/dashboard/Dashboard"
import MentorLayout from "../view/mentor/layout/mentorLayout";
import CommissionDashboard from "../view/mentor/pages/courses/Commission/CommissionDashboard";
import Communication from "../view/mentor/pages/communication/Communication";
import CoursesSection from "../view/mentor/pages/courses/CoursesSection";
import Dashboard from "../view/mentor/pages/dashboard/Dashboard";
import HomeLayout from "../view/client/layout/default";
import Categories from "../view/client/pages/categories/CourseList";
import Checkout from "../view/client/pages/checkout/Checkout";
import CourseHeader from "../view/client/pages/course";
import CourseViewer from "../view/client/pages/course-viewer/CourseViewer";
import Error404 from "../view/client/pages/error/Error404";
import HomeScreen from "../view/client/pages/home";
import InstructorInfo from "../view/client/pages/instructor-info";
import Login from "../view/client/pages/login/Login";
import OrderComplete from "../view/client/pages/order-complete/OrderComplete";
import Infomation from "../view/client/pages/profile";
import Signup from "../view/client/pages/register/SignUp";
import ShoppingCart from "../view/client/pages/shopping-cart/ShoppingCart";
import VerifyEmail from "../view/client/pages/register/VerifyEmail ";
import ResendEmail from "../view/client/pages/register/ResendEmail";
import Success from "../components/Success";
import PublicRoute from "../components/PublicRouter/PublicRoute";
import SignUpMentor from "../view/client/pages/register/SignUpMentor";

const AppRoutes = () => (
  <Routes>
    {/* Routes cho Client */}
    <Route path="/" element={<HomeLayout />}>

      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="resend-confirmation" element={<ResendEmail />} />
        <Route path="success" element={<Success />} />
      </Route>
      
      <Route path="sign-up-mentor"element={<SignUpMentor />} />
      <Route path="home" element={<HomeScreen />} />
      <Route path="categories" element={<Categories />} />
      <Route path="course" element={<CourseHeader />} />
      <Route path="course-viewer" element={<CourseViewer />} />

      {/* Bảo vệ các route yêu cầu đăng nhập */}
      <Route element={<PrivateRouter />}>
        <Route path="info-user" element={<Infomation />} />
        <Route path="instructor-info" element={<InstructorInfo />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="check-out" element={<Checkout />} />
        <Route path="order-complete" element={<OrderComplete />} />
      </Route>
    </Route>

    {/* Routes cho Mentor */}
    <Route path="mentor" element={<MentorLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="communication" element={<Communication />} />
      <Route path="courses" element={<CoursesSection />}>
        <Route path="commission/:id" element={<CommissionDashboard />} />
      </Route>
      <Route path="settings" element={<div>Settings</div>} />
    </Route>

    {/* Routes cho Admin */}
    <Route path="admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="settings" element={<div>Settings</div>} />
    </Route>

    {/* Route 404 */}
    <Route path="*" element={<Error404 />} />
  </Routes>
);

export default AppRoutes;
