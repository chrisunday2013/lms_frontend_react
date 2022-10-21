import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';

function OtpVerifyStudent(){
    const navigate=useNavigate();
    const [StudentData, setStudentData]=useState({
        otp_digit:''
        
    })
     
    const [errorMsg, setErrorMsg]=useState('');  
  
    const handleChange=(event)=>{
        setStudentData({
            ...StudentData,[event.target.name]:event.target.value
        });
    }

    const {student_id}=useParams();

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('otp_digit', StudentData.otp_digit)

        try{
            axios.post(baseUrl+'/verify-student/'+student_id+'/', studentFormData)
            .then((response)=>{
                // console.log(response.data);
                if(response.data.bool===true){
                    localStorage.setItem('studentLoginStatus', true);
                    localStorage.setItem('studentId', response.data.student_id);
                    navigate('/user-dashboard')
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
        navigate('/user-dashboard')
    }

    useEffect(()=>{
        document.title='Verify Student Login'
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
                                    <input value={StudentData.otp_digit} onChange={handleChange} type="number" name="otp_digit" className="form-control" />
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

export default OtpVerifyStudent;