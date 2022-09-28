import SideBar from "../sideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';


function StudentAssignment(){

const [assignmentData, setAssignmentData]=useState([]);
const [assignmentStatus, setAssignmentStatus]=useState('');


const studentId=localStorage.getItem('studentId');

//to fetch student went page loads
useEffect(()=>{

    try{
        axios.get(baseUrl+'/user-assignment/'+studentId)
        .then((res)=>{
            setAssignmentData(res.data);
        })
    }catch(error){
        console.log(error);
    }
},[]);

console.log(assignmentData)


    // Enroll for this course
    const markAsDone=(assignment_id, title, detail, student, teacher)=>{
        const _FormData=new FormData();
    
        _FormData.append("student_status", true);
        _FormData.append("title", title);
        _FormData.append("detail", detail);
        _FormData.append("student", student);
        _FormData.append("status", teacher);
       
        try{
            axios.put(baseUrl+'/update-assignment/'+assignment_id, _FormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
               if(response.status===200||response.status===201){
                  window.location.reload()
               }
            });
        }catch(error){
            console.log(error);
        }

    }


    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <SideBar/>
                </aside>
                <section className="col-md-9">
                     <div className="card">
                          <h5 className="card-header">My Assignment</h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Title</th>
                                           <th>Detail</th>
                                           <th>Teacher</th>
                                           <th>Action</th>
                                         
                                       </tr>
                                  </thead>
                                  <tbody>
                                    {assignmentData.map((row, index) =>
                                    <tr>
                                       <td>{row.title}</td>
                                       <td>{row.detail}</td>
                                       <td><Link to={`/teacher-detail/`+row.teacher.id}>{row.teacher.full_name}</Link></td>
                                       <td>
                                           {row.student_status==false &&
                                               <button onClick={()=>markAsDone(row.id,row.title, row.detail, row.student.id, row.teacher.id)} className="btn btn-primary btn-sm">Mark as done</button>
                                           }
                                             {row.student_status===true &&
                                               <span className="badge bg-success">Completed</span>
                                           }
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

export default StudentAssignment;