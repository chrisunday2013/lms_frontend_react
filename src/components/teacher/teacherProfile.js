import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';

function TeacherProfile(){
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status': '',
        'profile_img':'',
        'p_img':'',
    });
    const teacherId=localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{
                setteacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
                    prev_img:res.data.profile_img,
                    profile_img:'',
                    
                });
            });
        }catch(error){
            console.log(error);
        }
    },[]);

       // change value of element
       const handleChange=(event)=>{
        event.preventDefault();
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    // end 

    const handleFileChange=(event)=>{
        setteacherData({
            teacherData,
            [event.target.name]:event.target.files[0]
        })
    }

        // Submit Form
        const submitForm=()=>{
            const teacherFormData=new FormData();
    
            teacherFormData.append("full_name", teacherData.full_name)
            teacherFormData.append("email", teacherData.email)
            teacherFormData.append("qualification", teacherData.qualification)
            teacherFormData.append("mobile_no", teacherData.mobile_no)
            teacherFormData.append("skills", teacherData.skills)
            
            if(teacherData.profile_img !==""){
                teacherFormData.append("profile_img", teacherData.profile_img, teacherData.profile_img.name);
            }
    
      
            try{
                axios.put(baseUrl+'/teacher/'+teacherId, teacherFormData,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then((response)=>{
                    if(response.status==200){
                        Swal.fire({
                            title: 'Data has been updated',
                            icon: 'success',
                            toast:true,
                            timer:3000,
                            position:'top-right',
                            timerProgressBar:true,
                            showCanfirmButton:false
                        })
                    }
                    
                });
    
            }catch(error){
                 console.log(error);
                 setteacherData({'status':'error'})
            }
        };
    
    
        const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
        if(teacherLoginStatus!='true'){
            window.location.href='/teacher-login'
        }
    
        useEffect(()=>{
            document.title="Teacher Profile"
        },[]);    
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Profile Setting</h5>
                      <div className="card-body">
                           
                               <div class="mb-3 row">
                                    <label for="inputPassword" class="form-label">Full Name</label>
                                    <div class="col-sm-10">
                                    <input type="text" value={teacherData.full_name} onChange={handleChange} name="full_name"class="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <div class="mb-3 row">
                                    <label for="inputPassword" class="form-label">Email</label>
                                    <div class="col-sm-10">
                                    <input type="email"value={teacherData.email} onChange={handleChange} name="email" class="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <div class="mb-3 row">
                                    <label for="video" class="form-label">Profile Image</label>
                                    <input type="file" onChange={handleFileChange}  name="profile_img"/>
                                    {teacherData.prev_img &&
                                        <p className="mt-2"><img src={teacherData.prev_img} width="350" alt={teacherData.full_name}/></p>
                                    }
                            </div>

                           
                            <div className="mb-3 row">
                                <label for="exampleInputPassword1" className="form-label">Skills</label>
                                <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                                <div id="emailHelp" class="form-text">Php, Python, JavaScripts, etc</div>
                            </div>
                            <div className="mb-3 row">
                                <label for="exampleInputPassword1" className="form-label">Qualification</label>
                                <textarea value={teacherData.qualification} onChange={handleChange} name="qualification" className="form-control"></textarea>
                                <div id="emailHelp" class="form-text">BSC | MSC</div>
                            </div>
                           
                            <hr/>
                            <button onClick={submitForm} className="btn btn-primary">Update</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default TeacherProfile;