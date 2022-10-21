import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const baseUrl='http://127.0.0.1:8000/api';

function ForgetPassword(){
    const navigate=useNavigate()
    const [teacherData, setteacherData]=useState({
        email:'',
        
    })
     
    const [successMsg, setSuccessMsg]=useState('');  
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('email', teacherData.email)

        try{
            axios.post(baseUrl+'/teacher-forgot-password/', teacherFormData)
            .then((response)=>{
                if(response.data.bool===true){
                    setSuccessMsg(response.data.msg);
                    setErrorMsg('');
                }else{
                    setErrorMsg(response.data.msg);
                    setSuccessMsg('');
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
        document.title='Teacher Forget Password'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                    {successMsg && <p className="text-success">{successMsg}</p>}   
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <h5 className="card-header">Enter Your Registered Email</h5>
                        <div className="card-body">
                            
                           {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={teacherData.email} onChange={handleChange} type="email" name="email" className="form-control" />
                                    
                                </div>

                                <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>
                            {/* </form> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;