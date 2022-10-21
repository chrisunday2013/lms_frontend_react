import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';


const baseUrl='http://127.0.0.1:8000/api';

function ResetPassword(){
    const [teacherData, setteacherData]=useState({
        password:'',
        
    })

    const {teacher_id} = useParams()
     
    const [successMsg, setSuccessMsg]=useState('');  
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('password', teacherData.password)

        try{
            axios.post(baseUrl+'/teacher-reset-password/'+teacher_id+'/', teacherFormData)
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
        document.title='Teacher Reset Password'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                    {successMsg && <p className="text-success">{successMsg}</p>}   
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <h5 className="card-header">Enter Your New Password</h5>
                        <div className="card-body">
                            
                           {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Password</label>
                                    <input value={teacherData.password} onChange={handleChange} type="password" name="password" className="form-control" />
                                    
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

export default ResetPassword;