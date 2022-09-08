import Header from './header';
import Home from './home';
import Footer from './footer';
import CourseDetail from './courseDetail';
import Login from './user/login';
import Register from './user/register';
import Dashboard from './user/dashboard';
import MyCourses from './myCourses';
import FavoriteCoses from './favourite_cos';
import RecommendedCoses from './recomm_cos';
import Profile from './profile';
import ChangePassword from './changePassword';


import AllCourses from './allCourses';
import AllPopularCourses from './allPopularCourses';
import AllPopularTeachers from './allPopularTeacher';
import CourseCategory from './CourseCategory';


import TeacherLogin from './teacher/teacherLogin';
import TeacherReg from './teacher/teacherRegister';
import TeacherDashboard from './teacher/teacherDash';
import TeacherCourses from './teacher/MyCos';
import AddCourse from './teacher/addCos';
import UserList from './teacher/myUsers';
import TeacherProfile from './teacher/teacherProfile';
import TeacherChangePassword from './teacher/teacherChangePass';
import TeacherDetail from './teacher/teacherDetail';




import {Routes as Switch, Route} from 'react-router-dom';

function Main() {
  return (
    <div className="App">
      <Header/>
      <Switch>
         <Route path="/" element={<Home/>}/>
         <Route path="/detail/:course_id" element={<CourseDetail/>}/>
         <Route path="/user-login" element={<Login/>}/>
         <Route path="/user-register" element={<Register/>}/>
         <Route path="/user-dashboard" element={<Dashboard/>}/>
         <Route path="/my-courses" element={<MyCourses/>}/>
         <Route path="/favorite" element={<FavoriteCoses/>}/>
         <Route path="/recommended" element={<RecommendedCoses/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/change-pwd" element={<ChangePassword/>}/>
         <Route path="/teacher-register" element={<TeacherReg/>}/>
         <Route path="/teacher-login" element={<TeacherLogin/>}/>
         <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
         <Route path="/teacher-coses" element={<TeacherCourses/>}/>
         <Route path="/add-course" element={<AddCourse/>}/>
         <Route path="/my-users" element={<UserList/>}/>
         <Route path="/teacher-profile" element={<TeacherProfile/>}/>
         <Route path="/teacher-change-pwd" element={<TeacherChangePassword/>}/>
         <Route path="/teacher-login" element={<TeacherLogin/>}/>
         <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail/>}/>
         <Route path="/all-courses" element={<AllCourses/>}/>
         <Route path="/all-popularCos" element={<AllPopularCourses/>}/>
         <Route path="/all-popularTeachers" element={<AllPopularTeachers/>}/>
         <Route path="/category/:category_slug" element={<CourseCategory/>}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default Main;
