import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';

function TeacherLogin(){
    const [teacherLoginData, setteacherLoginData]=useState({
        email:'',
        password:''
        
    })
     
    
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setteacherLoginData({
            ...teacherLoginData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('email', teacherLoginData.email)
        teacherFormData.append('password', teacherLoginData.password)

        try{
            axios.post(baseUrl+'/teacher-login', teacherFormData)
            .then((response)=>{
                // console.log(response.data);
                if(response.data.bool===true){
                    localStorage.setItem('teacherLoginStatus', true);
                    localStorage.setItem('teacherId', response.data.teacher_id);
                    window.location.href='/teacher-dashboard';
                }else{
                    setErrorMsg('Invalid Email Or Password')
                }

            })
        }catch(error){
            console.log(error);
        }
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher-dashboard'
    }

    useEffect(()=>{
        document.title='Teacher Login'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            
                           {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={teacherLoginData.email} onChange={handleChange} type="email" name="email" className="form-control" />
                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={teacherLoginData.password} onChange={handleChange} type="password" name="password" className="form-control" />
                                </div>

                                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            {/* </form> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;