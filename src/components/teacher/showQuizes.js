import TeacherSideBar from "./teacherSideBar";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';


function ShowQuizes(){

    const [quizData, setQuizData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    console.log(teacherId);
        
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
    },[]);

    console.log(quizData)

    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                                <div className="card">
                          <h5 className="card-header">All Quiz</h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Name</th>
                                           <th>Total Enrolled</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {quizData.map((row, index)=>
                                       <tr>
                                            <td>
                                                <Link to={'/all-questions/' +row.id}>{row.title}</Link>
                                            </td>

                                            <td><Link to="#">12</Link></td>
                                            <td>
                                                 <Link className="btn btn-warning btn-sm" to="#">Edit</Link>
                                                 <Link className="btn btn-success btn-sm ms-2" to={'/add-quiz-question/' +row.id}>Add Question</Link>
                                                 <button className="btn btn-danger btn-sm ms-2">Delete</button>
                                             </td>
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

export default ShowQuizes;