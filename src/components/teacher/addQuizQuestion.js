import TeacherSideBar from "./teacherSideBar";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const baseUrl='http://127.0.0.1:8000/api';

function AddQuizQuestion(){
    const [questionData, setQuestionData]=useState({
        quiz:'',
        questions:'',
        ans1:'',
        ans2:'',
        ans3:'',
        ans4:'',
        right_ans:''
    });

  // change value of element
  const handleChange=(event)=>{
    setQuestionData({
        ...questionData,
        [event.target.name]:event.target.value
    });
}

const {quiz_id}=useParams()

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("quiz",quiz_id);
    _FormData.append("questions", questionData.questions)
    _FormData.append("ans1", questionData.ans1);
    _FormData.append("ans2", questionData.ans2);
    _FormData.append("ans3", questionData.ans3);
    _FormData.append("ans4", questionData.ans4);
    _FormData.append("right_ans", questionData.right_ans)

    try{
        axios.post(baseUrl+'/quiz-questions/',+quiz_id, _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            // console.log(response.data);
            if(response.status===200||response.status===201){
                  Swal.fire({
                    title:'Data has been added',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                  })
               window.location.reload();   
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
                      <h5 className="card-header">Add Quiz Question</h5>
                      <div className="card-body">
                       {/* <form>  */}
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title" className="form-control" id="title"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Ans 1</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="ans1" className="form-control" id="title"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Ans 2</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="ans2" className="form-control" id="title"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Ans 3</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="ans3" className="form-control" id="title"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Ans 4</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="ans4" className="form-control" id="title"/>
                                    </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="inputPassword" className="form-label">Right Answer</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="right_ans" className="form-control" id="title"/>
                                    </div>
                            </div>
                                    <hr/>
                                    <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>

                           {/* </form>    */}
                       </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default AddQuizQuestion;