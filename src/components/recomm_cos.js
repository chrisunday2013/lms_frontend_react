import SideBar from "./sideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';


function RecommendedCoses(){

const [courseData, setCourseData]=useState([]);
const studentId=localStorage.getItem('studentId');

//to fetch student went page loads
useEffect(()=>{

    try{
        axios.get(baseUrl+'/fetch-Enrolled-courses/'+studentId)
        .then((res)=>{
            setCourseData(res.data);
        })
    }catch(error){
        console.log(error);
    }
},[]);

console.log(courseData)


    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <SideBar/>
                </aside>
                <section className="col-md-9">
                     <div className="card">
                          <h5 className="card-header">My Courses</h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Name</th>
                                           <th>technologies</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                    {courseData.map((row, index) =>
                                    <tr>
                                       <td><Link to={`/detail/`+row.course.id}>{row.course.title}</Link></td>
                                       <td>{row.course.technology}</td>
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

export default RecommendedCoses;