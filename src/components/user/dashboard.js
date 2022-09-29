import SideBar from "../sideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams, Link } from "react-router-dom";



const baseUrl='http://127.0.0.1:8000/api';


function StudentDashboard(){
    const [dashData, setDashData]=useState([]);
    const studentId=localStorage.getItem('studentId');

    
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/dashboard/'+studentId)
            .then((res)=>{
                setDashData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                <SideBar/>
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-success text-white'>Enrolled Courses</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-courses">{dashData.enrolled_courses}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-primary text-white'>Favorite Courses</h5>
                                <div className="card-body">
                                    <h3><Link to="/favorite">{dashData.favorite_courses}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-info text-white'>Completed Assignment</h5>
                                <div className="card-body">
                                    <h5>
                                      <Link to="/assignment">Completed:{dashData.completed_assignment}, Pending:{dashData.pending_assignment}</Link> 
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StudentDashboard;