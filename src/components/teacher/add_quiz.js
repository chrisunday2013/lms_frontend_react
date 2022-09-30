import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl='http://127.0.0.1:8000/api';

function AddQuiz(){
    const [quizData, setQuizData]=useState({
        detail:'',
        title:'',
       
    });


  // change value of element
  const handleChange=(event)=>{
    setQuizData({
        ...quizData,
        [event.target.name]:event.target.value
    });
}


// Submit Form
const submitForm=()=>{
    const teacherId=localStorage.getItem('teacherId');
    const _FormData=new FormData();
   
    _FormData.append("teacher", teacherId);
    _FormData.append("title", quizData.title);
    _FormData.append("detail", quizData.detail);
    
    try{
        axios.post(baseUrl+'/quiz/', _FormData, {
           
        })
        .then((response)=>{
            // console.log(response.data);
            window.location.href='/add-quiz';
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
                      <h5 className="card-header">Add Quiz</h5>
                      <div className="card-body">
                           
                             
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title" className="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                           
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Detail</label>
                                <textarea onChange={handleChange} name="detail" className="form-control"></textarea>
                            </div>
                            
                                    <hr/>
                                    <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default AddQuiz;