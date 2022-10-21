import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';


const baseUrl='http://127.0.0.1:8000/api';

function UserResetPassword(){
    const [studentData, setStudentData]=useState({
        password:'',
        
    })

    const {student_id} = useParams()
     
    const [successMsg, setSuccessMsg]=useState('');  
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setStudentData({
            ...studentData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('password', studentData.password)

        try{
            axios.post(baseUrl+'/student-reset-password/'+student_id+'/', studentFormData)
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

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
        window.location.href='/user-dashboard'
    }

    useEffect(()=>{
        document.title='Student Reset Password'
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
                                    <input value={studentData.password} onChange={handleChange} type="password" name="password" className="form-control" />
                                    
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

export default UserResetPassword;