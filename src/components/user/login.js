import {useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';

function Login(){
    const navigate=useNavigate()
    const [studentLoginData, setStudentLoginData]=useState({
            email:'',
            password:''
            
    })

    const [errorMsg, setErrorMsg]=useState('');   

    const handleChange=(event)=>{
        setStudentLoginData({
            ...studentLoginData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('email', studentLoginData.email)
        studentFormData.append('password', studentLoginData.password)

        try{
            axios.post(baseUrl+'/student-login', studentFormData)
            .then((response)=>{
                if(response.data.bool===true){
                    if(response.data.login_auth_otp===true){
                        navigate('/verify-student/'+response.data.student_id);
                    }else{
                        localStorage.setItem('studentLoginStatus', true);
                        localStorage.setItem('studentId', response.data.student_id);
                        navigate('/user-dashboard');
                    }
                }else{
                    setErrorMsg(response.data.msg);
                }

            })
        }catch(error){
            console.log(error);
        }
    }
    
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
        window.location.href='/user-dashboard'
    }

    useEffect(()=>{
        document.title='student Login'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                           {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="text"  value={studentLoginData.email} onChange={handleChange} name='email' className="form-control" />
                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password"  value={studentLoginData.password} onChange={handleChange} name='password' className="form-control" />
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                                </div> */}
                               <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            {/* </form> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;