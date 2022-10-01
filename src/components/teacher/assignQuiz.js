import TeacherSideBar from "./teacherSideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import CheckQuizingCourse from "./checkQuizingCourse";
const Swal = require('sweetalert2')


const baseUrl='http://127.0.0.1:8000/api';


function AssignQuiz(){

    const [quizData, setQuizData]=useState([]);
    const [courseData, setCourseData] = useState([])
    const teacherId=localStorage.getItem('teacherId');
    

    const {course_id}=useParams();
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/show-quiz/'+teacherId)
            .then((res)=>{
                setQuizData(res.data);
            })
        }catch(error){
            console.log(error);
        }

        // Fetch Courses
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                setCourseData(res.data);
              
            })
        }catch(error){
            console.log(error);
        }

    },[]);

       



    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                                <div className="card">
                          <h5 className="card-header">Assign Quiz <span className="text-primary">({courseData.title})</span></h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Name</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {quizData.map((row, index)=>
                                            <tr>
                                                <td>
                                                    <Link to={`/all-questions/` +row.id}>{row.title}</Link>
                                                </td>
                                                     <CheckQuizingCourse quiz={row.id} course={course_id}/>
                                            </tr>  
                                         
                                       )}
                                  </tbody>
                              </table>

                          </div>
                     </div>
                </section>
            </div>
        </div>
    )
}

export default AssignQuiz;