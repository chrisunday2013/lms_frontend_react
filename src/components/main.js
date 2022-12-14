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
import Search from './search';
import Category from './category';


import AddQuizQuestion from './teacher/addQuizQuestion';
import AllCourses from './allCourses';
import AllPopularCourses from './allPopularCourses';
import AllPopularTeachers from './allPopularTeacher';
import CourseCategory from './CourseCategory';
import UserStudyMaterial from './user/studyMaterial';


import AttemptedStudent from './attemptedStudent';
import StudyMaterial from './teacher/studyMaterial'
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
import AddStudyMaterial from './teacher/addStudyMaterial';
import EditChapter from './teacher/editChapter';
import EditCourse from './teacher/editCourse';
import AddQuiz from './teacher/add_quiz';
import ShowQuizes from './teacher/showQuizes';
import EditQuiz from './teacher/editQuiz';
import QuizQuestions from './teacher/quizQuestions';
import AssignQuiz from './teacher/assignQuiz';
import CourseQuizList from './courseQuizList';
import TakeQuiz from './takeQuiz';
import Faqs from './faqs';
import Page from './page';
import ContactUs from './contactUs';
import OtpVerify from './otpVerify';
import OtpVerifyStudent from './user/otpVerifyStudent';
import ForgetPassword from './teacher/forgetPassword';
import UserResetPassword from './user/userResetPassword';
import StudentForgetPass from './user/userForgetPass';



import {Routes as Switch, Route} from 'react-router-dom';
import ResetPassword from './teacher/resetPassword';


function Main() {
  return (
    <div className="App">
      <Header/>
      <Switch>
         <Route path="/" element={<Home/>}/>
         <Route path="/search/:search_id" element={<Search/>}/>
         <Route path="/detail/:course_id" element={<CourseDetail/>}/>
         <Route path="/user-login" element={<Login/>}/>
         <Route path="/teacher-forget-password" element={<ForgetPassword/>}/>
         <Route path="/teacher-reset-password/:teacher_id" element={<ResetPassword/>}/>

         <Route path="/student-forget-password" element={<StudentForgetPass/>}/>
         <Route path="/student-reset-password/:student_id" element={<UserResetPassword/>}/>

         <Route path="/verify-teacher/:teacher_id" element={<OtpVerify/>}/>
         <Route path="/verify-student/:student_id" element={<OtpVerifyStudent/>}/>
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
         <Route path="/course/:category_id/:category_slug" element={<CourseCategory/>}/>
         <Route path="/category" element={<Category/>}/>
         <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
         <Route path="/add-study/:course_id" element={<AddStudyMaterial/>}/>
         <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourse/>}/>
         <Route path="/add-quiz" element={<AddQuiz/>}/>
         <Route path="/quiz" element={<ShowQuizes/>}/>
         <Route path="/faq" element={<Faqs/>}/>
         <Route path="/contact-us" element={<ContactUs/>}/>
         <Route path="/page/:page_id/:page_slug" element={<Page/>}/>
         <Route path="/edit-quiz/:quiz_id" element={<EditQuiz/>}/>
         <Route path="/add-quiz-question/:quiz_id" element={<AddQuizQuestion/>}/>
         <Route path="/all-questions/:quiz_id" element={<QuizQuestions/>}/>
         <Route path="/assign-quiz/:course_id" element={<AssignQuiz/>}/>
         <Route path="/course-quiz/:course_id" element={<CourseQuizList/>}/>
         <Route path="/take-quiz/:quiz_id" element={<TakeQuiz/>}/>
         <Route path="/attempted-students/:quiz_id" element={<AttemptedStudent/>}/>
         <Route path="/study-materials/:course_id" element={<StudyMaterial/>}/>

         <Route path="/user/study-materials/:course_id" element={<UserStudyMaterial/>}/>


      </Switch>
      <Footer/>
    </div>
  );
}

export default Main;
