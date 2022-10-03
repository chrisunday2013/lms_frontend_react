import SideBar from "./sideBar";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";


const baseUrl='http://127.0.0.1:8000/api';

function TakeQuiz(){
const [QuestionData, setQuestionData]=useState([]);
const {quiz_id}=useParams();
const studentId=localStorage.getItem('studentId');

//to fetch questions went page loads
useEffect(()=>{
    try{
        axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/1')
        .then((res)=>{
            setQuestionData(res.data);
        })
    }catch(error){
        console.log(error);
    }
},[]);

const submitAnswer=(question_id,right_ans)=>{
    const _FormData=new FormData();
    _FormData.append("student",studentId);
    _FormData.append("question", question_id)
    _FormData.append("quiz", quiz_id)
    _FormData.append("right_ans", right_ans)

    try{
        axios.post(baseUrl+'/attempt-quiz/', _FormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            if(response.status===200||response.status===201){
                try{
                    axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/next-question/'+question_id)
                    .then((res)=>{
                        setQuestionData(res.data);
                    })
                }catch(error){
                    console.log(error);
                }  
            }
        })
    }catch(error){
        console.log(error);
    }

}

    return (
        <div className="container mt-4">
            <div className="row">
               <aside className="col-md-3">
                   <SideBar/>
                </aside>
                <section className="col-md-9">
                    <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
                    {QuestionData.map((row, index)=>
                     <div className="card">
                          <h5 className="card-header">{row.questions}</h5>
                          <div className="card-body">
                              <table className="table table-bordered">
                                  <tbody>
                                
                                       <>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans1)} className="btn btn-outline-secondary">{row.ans1}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans2)} className="btn btn-outline-secondary">{row.ans2}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans3)} className="btn btn-outline-secondary">{row.ans3}</button></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={()=>submitAnswer(row.id,row.ans4)} className="btn btn-outline-secondary">{row.ans4}</button></td>
                                        </tr>
                                        </>
                                 
                                  </tbody>
                              </table>
                          </div>
                     </div>
                          )}
                </section>
            </div>
        </div>
    )
}

export default TakeQuiz;