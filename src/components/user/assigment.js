import SideBar from "../sideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';


function StudentAssignment(){

const [assignmentData, setAssignmentData]=useState([]);
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
                                           <th>Created By</th>
                                         
                                       </tr>
                                  </thead>
                                  <tbody>
                                    {assignmentData.map((row, index) =>
                                    <tr>
                                       <td><Link to={`/detail/`+row.id}>{row.title}</Link></td>
                                       <td><Link to={`/detail/`+row.id}>{row.detail}</Link></td>
                                       <td><Link to={`/teacher-detail/`+row.teacher.id}>{row.teacher.full_name}</Link></td>
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