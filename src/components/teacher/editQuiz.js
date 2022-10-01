import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';

function EditQuiz(){

    const [quizData, setQuizData]=useState({
        detail:'',
        title:'',
    });
    
    const {quiz_id}= useParams();
    const teacherId = localStorage.getItem('teacherId')

    useEffect(()=>{
       
        // fetch current quiz data
        try{
            axios.get(baseUrl+'/teacherQuiz-detail/'+quiz_id)
            .then((res)=>{
                console.log(res.data)
                setQuizData({
                    detail:res.data.detail,
                    title:res.data.title,
                
                   
                });
            });
        }catch(error){
            console.log(error);
        }
        //end

    },[]);

  // change value of element
  const handleChange=(event)=>{
    setQuizData({
        ...quizData,
        [event.target.name]:event.target.value
    });
}


// Submit Form
const submitForm=()=>{
    const _formData=new FormData();

    _formData.append("teacher",teacherId);
    _formData.append("title", quizData.title)
    _formData.append("detail", quizData.detail)
   
    try{
        axios.put(baseUrl+'/teacherQuiz-detail/'+quiz_id, _formData, {
           
        })
        .then((res)=>{
            if(res.status==200){
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
            
        })
    }catch(error){
        console.log(error);
    }

};


    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Edit Quiz</h5>
                      <div className="card-body">
                          <form>
                             
                            <div className="mb-3 row">
                                    <label for="title" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text"  value={quizData.title} onChange={handleChange} name="title" className="form-control"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="description" className="form-label">Detail</label>
                                <textarea  value={quizData.detail} onChange={handleChange} name="detail" className="form-control">
                                    id="description"</textarea>
                            </div>
                                    <hr/>
                                    <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>
                          </form> 
                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default EditQuiz;