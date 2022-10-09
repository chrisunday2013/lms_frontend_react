
import axios from 'axios';
import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";


const baseUrl='http://127.0.0.1:8000/api';


function CheckQuizingCourse(props){
    const [quizData, setQuizData]=useState([]);


    const teacherId=localStorage.getItem('teacherId');
    
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res)=>{
                setQuizData(res.data);
            })
        }catch(error){
            console.log(error);
        }

    },[]);

    console.log(quizData)

    
    // assign quiz to course
    const assignQuiz=(quiz_id)=>{
        const _FormData=new FormData();
        _FormData.append("teacher", teacherId);
        _FormData.append("course", props.course);
        _FormData.append("quiz",props.quiz);
       
        try{
            axios.post(baseUrl+'/quiz-assign-course/', _FormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status===200||response.status===201){
                   window.location.reload();
                    }
            });
        }catch(error){
            console.log(error);
        }

    }

    return (
        <td>
            {quizData.bool==false &&
              <button onClick={()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>
            }

            {quizData.bool==true &&
            <>
              <span className='btn btn-sm btn-secondary'>
                Assigned
              </span>
              &nbsp;
              <Link className='btn btn-sm btn-info' to={`/attempted-students/`+props.quiz}>Attempted Students</Link>
            
              </>
            }
        </td>
    )
}

export default CheckQuizingCourse;