import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';
function Page(){
    const [pageData, setPageData]=useState([]);


    let {page_id, page_slug}=useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/pages/'+page_id+'/'+page_slug)
            .then((res)=>{
                console.log(res.data)
                setPageData(res.data);
            })
        }catch(error){
            console.log(error)
        }

    },[page_id])
    return (
        <div className="container mt-3">
            <h2>{pageData.title}</h2>
            <h2>{pageData.content}</h2>
        </div>
    )
}

export default Page;