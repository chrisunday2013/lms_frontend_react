
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';


function QuizResult(props){
    const [resultData, setResultData]=useState([]);
    
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
            .then((res)=>{
                setResultData(res.data);
            })
        }catch(error){
            console.log(error);
        }

    },[]);

    return (
       
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Quiz Result</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <table className="table table-bordered">
                    <tr>
                        <td>Total Questions</td>
                        <td>{resultData.total_questions}</td>
                    </tr>
                    <tr>
                        <td>Attempted Questions</td>
                        <td>{resultData.total_attempted_questions}</td>
                    </tr>
                    <tr>
                        <td>Correctly Answered</td>
                        <td>{resultData.total_correct_questions}</td>
                    </tr>
                </table>
                </div>
                </div>
            </div>
    
    )
}

export default QuizResult;