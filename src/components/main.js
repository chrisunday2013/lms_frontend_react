import Header from './header';
import Home from './home';
import Footer from './footer';
import CourseDetail from './courseDetail';
import Login from './user/login';
import StudentLogout from './user/logout';
import EnrolledStudents from './user/enrolledStudents';
import Register from './user/register';
import Dashboard from './user/dashboard';
import StudentDashboard from './user/dashboard';
import MyCourses from './myCourses';
import FavoriteCoses from './favourite_cos';
import RecommendedCoses from './recomm_cos';
import Profile from './profile';
import ChangePassword from './changePassword';


import AllCourses from './allCourses';
import AllPopularCourses from './allPopularCourses';
import AllPopularTeachers from './allPopularTeacher';
import CourseCategory from './CourseCategory';


import StudentAssignment from './user/assigment';
import AddAssignment from './teacher/addAssignment';
import ShowAssignment from './teacher/showAssignment';
import TeacherSkillCourse from './teacher/teacherSkillCoses';
import TeacherLogin from './teacher/teacherLogin';
import TeacherReg from './teacher/teacherRegister';
import TeacherDashboard from './teacher/teacherDash';
import TeacherCourses from './teacher/MyCos';
import AddCourse from './teacher/addCos';
import UserList from './teacher/myUsers';
import TeacherProfile from './teacher/teacherProfile';
import TeacherChangePassword from './teacher/teacherChangePass';
import TeacherDetail from './teacher/teacherDetail';
import TeacherLogout from './teacher/teacherLogout';
import AddChapter from './teacher/addChaper';
import AllChapters from './teacher/allChapters';
import EditChapter from './teacher/editChapter';
import EditCourse from './teacher/editCourse';
import AddQuiz from './teacher/add_quiz';
import ShowQuizes from './teacher/showQuizes';
import EditQuiz from './teacher/editQuiz';




import {Routes as Switch, Route} from 'react-router-dom';


function Main() {
  return (
    <div className="App">
      <Header/>
      <Switch>
         <Route path="/" element={<Home/>}/>
         <Route path="/detail/:course_id" element={<CourseDetail/>}/>
         <Route path="/user-login" element={<Login/>}/>
         <Route path="/user-logout" element={<StudentLogout/>}/>
         <Route path="/user-register" element={<Register/>}/>
         <Route path="/user-dashboard" element={<Dashboard/>}/>
         <Route path="/student-dashboard" element={<StudentDashboard/>}/>
         <Route path="/my-courses" element={<MyCourses/>}/>
         <Route path="/favorite" element={<FavoriteCoses/>}/>
         <Route path="/recommended" element={<RecommendedCoses/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/change-pwd" element={<ChangePassword/>}/>
         <Route path="/teacher-register" element={<TeacherReg/>}/>
         <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
         <Route path="/teacher-coses" element={<TeacherCourses/>}/>
         <Route path="/add-course" element={<AddCourse/>}/>
         <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment/>}/>
         <Route path="/show-assignment/:student_id/:teacher_id" element={<ShowAssignment/>}/>
         <Route path="/assignment/" element={<StudentAssignment/>}/>
         <Route path="/my-users" element={<UserList/>}/>
         <Route path="/teacher-profile" element={<TeacherProfile/>}/>
         <Route path="/teacher-change-pwd" element={<TeacherChangePassword/>}/>
         <Route path="/teacher-login" element={<TeacherLogin/>}/>
         <Route path="/teacher-logout" element={<TeacherLogout/>}/>
         <Route path="/teacher-detail/:id" element={<TeacherDetail/>}/>
         <Route path="/all-courses" element={<AllCourses/>}/>
         <Route path="/edit-course/:course_id" element={<EditCourse/>}/>
         <Route path="/all-chapters/:course_id" element={<AllChapters/>}/>
         <Route path="/edit-chapter/:chapter_id" element={<EditChapter/>}/>
         <Route path="/enrolled-student/:course_id" element={<EnrolledStudents/>}/>
         <Route path="/all-popularCos" element={<AllPopularCourses/>}/>
         <Route path="/all-popularTeachers" element={<AllPopularTeachers/>}/>
         <Route path="/category/:category_slug" element={<CourseCategory/>}/>
         <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
         <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourse/>}/>
         <Route path="/add-quiz" element={<AddQuiz/>}/>
         <Route path="/quiz" element={<ShowQuizes/>}/>
         <Route path="/edit-quiz/:quiz_id" element={<EditQuiz/>}/>

      </Switch>
      <Footer/>
    </div>
  );
}

export default Main;
