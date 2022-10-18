import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';


const baseUrl='http://127.0.0.1:8000/api';

function OtpVerify(){
    const navigate=useNavigate();
    const [teacherData, setTeacherData]=useState({
        otp_digit:''
        
    })
     
    
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setTeacherData({
            ...teacherData,[event.target.name]:event.target.value
        });
    }

    const {teacher_id}=useParams();

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('otp_digit', teacherData.otp_digit)

        try{
            axios.post(baseUrl+'/verify-teacher/'+teacher_id+'/', teacherFormData)
            .then((response)=>{
                // console.log(response.data);
                if(response.data.bool===true){
                    localStorage.setItem('teacherLoginStatus', true);
                    localStorage.setItem('teacherId', response.data.teacher_id);
                    navigate('/teacher-dashboard')
                    // window.location.href='/teacher-dashboard';
                }else{
                    setErrorMsg(response.data.msg);
                }

            })
        }catch(error){
            console.log(error);
        }
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
        navigate('/teacher-dashboard')
        // window.location.href='/teacher-dashboard'
    }

    useEffect(()=>{
        document.title='Verify Teacher Login'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <h5 className="card-header">Enter 6 Digit OTP</h5>
                        <div className="card-body">
                            
                           {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">OTP</label>
                                    <input value={teacherData.otp_digit} onChange={handleChange} type="number" name="otp_digit" className="form-control" />
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

export default OtpVerify;