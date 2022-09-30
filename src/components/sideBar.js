import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';

function SideBar(){
    const [notifiData, setNotifiData]=useState([]);
    const studentId=localStorage.getItem('studentId');
    useEffect(()=>{
        
        try{
            axios.get(baseUrl+'/student/fetch-all-notifications/'+studentId)
            .then((res)=>{
                console.log(res);
                setNotifiData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/student-dashboard" className="list-group-item list-group-item-action">Student Dashboard</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/favorite" className="list-group-item list-group-item-action">Favorite Courses</Link>
                <Link to="/assignment" className="list-group-item list-group-item-action">Assignments<span className="float-end badge bg-danger">
                {notifiData.length}</span></Link>
                <Link to="/recommended" className="list-group-item list-group-item-action">Recommended courses</Link>
                <Link to="/profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/change-pwd" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
  
            </div>
        </div>
    )
}

export default SideBar;