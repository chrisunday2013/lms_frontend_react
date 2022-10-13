import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Faqs(){
    const [faqData, setFaqData]=useState([]);

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/faq/')
            .then((res)=>{
                setFaqData(res.data);
            })
        } catch(error){
            console.log(error);
        }
    },[]);

    return(
          <div className="container mt-3">
                <h3 className="pb-1 mb-4">FAQs</h3>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            {faqData.map((row,index)=> 
                            <>
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                {row.question}
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>{row.answer}</strong>
                            </div>
                            </div>
                           
                            </>
                             )}    
                        </div>
                
                    </div>
                
        </div>
    )
}

export default Faqs;