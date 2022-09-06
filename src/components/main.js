import Header from './header';
import Home from './home';
import Footer from './footer';
import CourseDetail from './courseDetail';
import Login from './user/login';
import Register from './user/register';


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
      </Switch>
      <Footer/>
    </div>
  );
}

export default Main;
