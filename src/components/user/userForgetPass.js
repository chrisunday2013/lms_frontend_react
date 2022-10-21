import {useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';

function StudentForgetPass(){
    const [studentData, setStudentData]=useState({
        email:'',
        
    })
     
    const [successMsg, setSuccessMsg]=useState('');  
    const [errorMsg, setErrorMsg]=useState('');  
  

    const handleChange=(event)=>{
        setStudentData({
            ...studentData,[event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('email', studentData.email)

        try{
            axios.post(baseUrl+'/student-forgot-password/', studentFormData)
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
        document.title='Student Forget Password'
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
                                    <input value={studentData.email} onChange={handleChange} type="email" name="email" className="form-control" />
                                    
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

export default StudentForgetPass;