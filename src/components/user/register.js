import React, { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl="http://localhost:8000/api/student/";

function Register(){
    
    const [studentData, setStudentData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status': ''
    });
    
     // change value of element
     const handleChange=(event)=>{
        event.preventDefault();
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }
    
    
        // Submit Form
        const submitForm=()=>{
            const studentFormData=new FormData();
    
            studentFormData.append("full_name", studentData.full_name)
            studentFormData.append("email", studentData.email)
            studentFormData.append("username", studentData.username)
            studentFormData.append("password", studentData.password)
            studentFormData.append("interested_categories", studentData.interested_categories)
    
    
            try{
                axios.post(baseUrl,studentFormData).then((response)=>{
                    setStudentData({
                        'full_name':'',
                        'email':'',
                        'username':'',
                        'password':'',
                        'interested_categories':'',
                        'status': 'success'
                    });
                });
    
            }catch(error){
                 console.log(error);
                 setStudentData({'status':'error'})
            }
        };
        
    
        
        // const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
        // if(teacherLoginStatus=='true'){
        //     window.location.href='/user-dashboard'
        // }
    
        useEffect(()=>{
            document.title="Student Register"
        });
        
    
    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-6 offset-3">
                {studentData.status==='success' && <p className="text-success">Thanks for your registration</p>}
                {studentData.status==='error' && <p className="text-danger">Something went wrong with your registration</p>}
                <div className="card">
                    <h5 className="card-header">Student Register</h5>
                    <div className="card-body">
                       {/* <form> */}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full name</label>
                                <input name="full_name" type="text"  value={studentData.full_name} onChange={handleChange} className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input name="email" type="email"  value={studentData.email} onChange={handleChange} className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Username</label>
                                <input name="username"  value={studentData.username} onChange={handleChange} type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input name="password" value={studentData.password}  onChange={handleChange} type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Interest</label>
                                <textarea name="interested_categories"  value={studentData.interested_categories} 
                                onChange={handleChange} className="form-control"></textarea>
                                <div id="emailHelp" class="form-text">Php, Python, JavaScripts, etc</div>
                            </div>
                        
                            <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                        {/* </form> */}
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default Register