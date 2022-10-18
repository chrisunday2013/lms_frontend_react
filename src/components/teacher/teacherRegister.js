import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const baseUrl="http://localhost:8000/api/teacher/";


function TeacherReg(){
    const navigate=useNavigate();
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'otp_digit':'',
        'status': ''
    });

    // change value of element
    const handleChange=(event)=>{
        event.preventDefault();
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    //End

    // Submit Form
    const submitForm=()=>{
        const otp_digit=Math.floor(1000000 + Math.random() * 900000);
        const teacherFormData=new FormData();

        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("otp_digit", otp_digit)
        teacherFormData.append("skills", teacherData.skills)


        try{
            axios.post(baseUrl,teacherFormData).then((response)=>{
                console.log(response.data);
                navigate('/verify-teacher/'+response.data.id)
                // window.location.href='/verify-teacher/'+response.data.id;
                // setteacherData({
                //     'full_name':'',
                //     'email':'',
                //     'password':'',
                //     'qualification':'',
                //     'mobile_no':'',
                //     'skills':'',
                //     'status': 'success'
                // });
            });

        }catch(error){
             console.log(error);
             setteacherData({'status':'error'})
        }
    };


    useEffect(()=>{
        document.title="Teacher Register"
    });
    
    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-6 offset-3">
                {teacherData.status==='success' && 
                   <p className="text-success">Thanks for your registration</p>
                }
                {teacherData.status==='error' && 
                  <p className="text-danger">Something went wrong with your registration</p>
                }
                <div className="card">
                    <h5 className="card-header">Teacher Register</h5>
                    <div className="card-body">
                       {/* <form> */}
                           <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full name</label>
                                <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                             </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input value={teacherData.password} onChange={handleChange} name="password" type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Qualification</label>
                                <input value={teacherData.qualification} onChange={handleChange} name="qualification" type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Mobile Number</label>
                                <input value={teacherData.mobile_no} onChange={handleChange} name="mobile_no" type="number" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Skills</label>
                                <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Php, Python, JavaScripts, etc</div>
                            </div>
                        
                            <button onClick={submitForm}  type="submit" className="btn btn-primary">Register</button>
                        {/* </form> */}
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default TeacherReg