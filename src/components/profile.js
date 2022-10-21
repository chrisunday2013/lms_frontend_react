import SideBar from "./sideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';

function Profile(){
    const [studentData, setStudentData]=useState({
        'full_name':'',
        'email':'',
        'status': '',
        'username':'',
        'interested_categories':'',
        'profile_img':'',
        'p_img':'',
        'login_auth_otp':'',
    });
    const studentId=localStorage.getItem('studentId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/'+studentId)
            .then((res)=>{
                setStudentData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    interested_categories:res.data.interested_categories,
                    prev_img:res.data.profile_img,
                    profile_img:'',
                    login_auth_otp:res.data.login_auth_otp,
                    
                });
            });
        }catch(error){
            console.log(error);
        }
    },[]);

       // change value of element
       const handleChange=(event)=>{
        event.preventDefault();
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }
    // end 

    const handleFileChange=(event)=>{
        setStudentData({
                studentData,
            [event.target.name]:event.target.files[0]
        })
    }

        // Submit Form
        const submitForm=()=>{
            const studentFormData=new FormData();
    
            studentFormData.append("full_name", studentData.full_name)
            studentFormData.append("email", studentData.email)
            studentFormData.append("username", studentData.username)
            studentFormData.append("interested_categories", studentData.interested_categories)
            studentFormData.append("login_auth_otp", studentFormData.login_auth_otp)

            if(studentData.profile_img !==""){
                studentFormData.append("profile_img", studentData.profile_img, studentData.profile_img.name);
            }
    
      
            try{
                axios.put(baseUrl+'/student/'+studentId, studentFormData,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then((response)=>{
                    if(response.status==200){
                        Swal.fire({
                            title: 'Data has been updated',
                            icon: 'success',
                            toast:true,
                            timer:3000,
                            position:'top-right',
                            timerProgressBar:true,
                            showCanfirmButton:false
                        })
                    }
                    
                });
    
            }catch(error){
                 console.log(error);
                 setStudentData({'status':'error'})
            }
        };
    
    
        const studentLoginStatus=localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus!='true'){
            window.location.href='/user-login'
        }
    
        useEffect(()=>{
            document.title="Student Profile"
        },[]);    

        
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                <SideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Profile Setting</h5>
                      <div className="card-body">
                           
                               <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Full Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={studentData.full_name} onChange={handleChange} name="full_name"className="form-control"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Email</label>
                                    <div className="col-sm-10">
                                    <input type="email"value={studentData.email} onChange={handleChange} name="email" className="form-control"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="video" className="form-label">Profile Image</label>
                                    <input type="file" onChange={handleFileChange}  name="profile_img"/>
                                    {studentData.prev_img &&
                                        <p className="mt-2"><img src={studentData.prev_img} width="350" alt={studentData.full_name}/></p>
                                    }
                            </div>

                           
                            <div className="mb-3 row">
                                <label for="exampleInputPassword1" className="form-label">Username</label>
                                <input type="text" value={studentData.username} onChange={handleChange} name="username" className="form-control" />
                            </div>
                            <div className="mb-3 row">
                                <label for="exampleInputPassword1" className="form-label">Interested Categories</label>
                                <textarea value={studentData.interested_categories} onChange={handleChange} name="interested_categories" className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Java | Python</div>
                            </div>

                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Login_Auth_Otp</label>
                                    <div class="col-sm-10">
                                    <input type="text"value={studentData.login_auth_otp} onChange={handleChange} name="login_auth_otp" className="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                           
                            <hr/>
                            <button onClick={submitForm} className="btn btn-primary">Update</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default Profile;