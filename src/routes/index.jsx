import { Routes, Route } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import PublicRoute from "../components/PublicRouter/PublicRoute";

// Layouts
import HomeLayout from "../view/client/layout/default";
import MentorLayout from "../view/mentor/layout/MentorLayout";
import AdminLayout from "../view/admin/layout/AdminLayout";

// Client Pages
import HomeScreen from "../view/client/pages/home";
import Login from "../view/client/pages/login/Login";
import Signup from "../view/client/pages/register/SignUp";
import ResendEmail from "../view/client/pages/register/ResendEmail";
import Success from "../components/Success";
import Infomation from "../view/client/pages/profile";
import InstructorInfo from "../view/client/pages/instructor-info";
import ShoppingCart from "../view/client/pages/shopping-cart/ShoppingCart";
import Checkout from "../view/client/pages/checkout/Checkout";
import OrderComplete from "../view/client/pages/order-complete/OrderComplete";
import Categories from "../view/client/pages/categories/CourseList";
import CourseViewer from "../view/client/pages/course-viewer/CourseViewer";
import CourseHeader from "../view/client/pages/course";
import VerifyEmail from "../view/client/pages/register/VerifyEmail ";
import SignUpMentor from "../view/client/pages/register/SignUpMentor";
import OrderHistory from "../view/client/pages/order-history/OrderHistory";
import ChatRoom from "../view/client/pages/profile/Chat/ChatRoom";

// Mentor Pages
import Dashboard from "../view/mentor/pages/dashboard/Dashboard";
import Communication from "../view/mentor/pages/communication/Communication";
import AddCourseForm from "../components/AddCourse/AddCourseForm";
import AddCourseSectionForm from "../components/AddCourse/AddCourseSectionForm";
import CourseStudentList from "../view/mentor/pages/courses/CourseStudentList/CourseStudentList";
import ViewMentorCourses from "../view/mentor/pages/courses/ViewListCourse/ViewMentorCourses";
import MentorProfilePage from "../view/mentor/pages/profile-mentor/index"

// Admin Pages
import AdminDashboard from "../view/admin/pages/dashboard/Dashboard";
import CategoryList from "../view/admin/pages/categories/CategoryList";
import CategoryWarehouse from "../view/admin/pages/categories/CategoryWarehouse";
import AdminUserPage from "../view/admin/pages/users/AdminUserPage";

// Error Pages
import Error404 from "../view/client/pages/error/Error404";
import ChatRoomMentor from "../view/mentor/pages/chat";
import MyCourseRatingsPage from "../view/client/pages/contact/MyCourseRatingsPage";
import FAQPage from "../view/client/pages/FAQ/FAQPage";
import PolicyPage from "../view/client/pages/policy/PolicyPage";
import EditCourseForm from "../components/AddCourse/EditCourseForm";
import ForgotPassword from "../view/client/pages/login/ForgotPassword";
import ResetPassword from "../view/client/pages/login/ResetPassword";
import OAuth2RedirectHandler from "../view/client/pages/login/OAuth2RedirectHandler";
import CourseAssignments from "../view/mentor/pages/courses/CourseAssignments";
import MyCourseAssignments from "../view/client/pages/profile/MyCourses/MyCourseAssignments";


const AppRoutes = () => (
  <Routes>
    {/* Route 404 */}
    <Route path="/*" element={<Error404 />} />
    {/* Routes cho Client */}
    <Route path="/*" element={<HomeLayout />}>
      <Route index element={<HomeScreen />} />
      <Route path="login" element={<Login />} />
      <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="sign-up" element={<Signup />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="resend-confirmation" element={<ResendEmail />} />
      <Route path="success" element={<Success />} />
      <Route path=":userId/rating" element={<MyCourseRatingsPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="policy" element={<PolicyPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="categories" element={<Categories />} />
      <Route path="course-details/:id" element={<CourseHeader />} />

      <Route element={<PrivateRouter />}>
        <Route path="info-user/:id" element={<Infomation />} />
        <Route path="instructor-info/:id" element={<InstructorInfo />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="check-out" element={<Checkout />} />
        <Route path="payment-success" element={<OrderComplete />} />
        <Route path="sign-up-mentor" element={<SignUpMentor />}/>
        <Route path="my-learning/:id/learn" element={<CourseViewer />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="chat-rooms" element={<ChatRoom />} />
        <Route path="my-assignment/:id/learn" element={<MyCourseAssignments />} />
      </Route>
      
        {/* <Route path="course-detail/:id" element={<CourseDetails />} />
      </Route> */}
      
    </Route>

    {/* Routes cho Mentor */}
    <Route path="mentor/*" element={<MentorLayout />}>
      <Route path="dashboard/:id" element={<Dashboard />} />
      <Route path="courses" element={<ViewMentorCourses />} />
      <Route path="courses/add" element={<AddCourseForm />} />
      <Route path="course/:id/edit" element={<EditCourseForm />} />
      <Route path="courses/section/:courseId" element={<AddCourseSectionForm />} />
      <Route path="courses/:id/students" element={<CourseStudentList/>} />
      <Route path="chat-rooms" element={<ChatRoomMentor />} />
      <Route path="profile-mentor/:id" element={<MentorProfilePage />} />
      <Route path="courses/assignments/:id" element={<CourseAssignments />} />
    </Route>

    {/* Routes cho Admin */}
    <Route path="admin/*" element={<AdminLayout />}>
      <Route path="dashboard/:id" element={<AdminDashboard />} />
      <Route path="categories/:id" element={<CategoryList />} />
      <Route path="warehouse/:id" element={<CategoryWarehouse />} />
      <Route path="users/:id" element={<AdminUserPage />} />
    </Route>

    
  </Routes>
);

export default AppRoutes;
