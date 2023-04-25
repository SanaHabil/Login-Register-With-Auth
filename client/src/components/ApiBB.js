import React from 'react'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'


const ApiBB = () => {
    const [shows, setShows] = useState([])
    const [movie, setMovie] = useState([])
    let {id} = useParams()

    // useEffect(()=>{
    //     const api = "https://www.breakingbadapi.com/api";

    //         async function getData(){
    //             const response = await fetch(api);
    //             const data =await response.json();

    //             console.log(data)
    //         }
    // },[])

    useEffect(()=>{
        axios.get("https://api.tvmaze.com/shows")
        .then((res)=>{
            console.log(res.data)
            setShows(res.data)
        
        })
        .catch((err)=>{
        console.log('There is an Error')

        })
    },[])

    const getMovie =(e)=>{
        console.log(e);
    }

    // async function getCh(e){
    //     const response = await fetch(`https://api.tvmaze.com/shows/:${id}`)
    //     const data = await response.json()
    //     console.log(response.data.meals[0])
    //     setCardView(response.data.meals[0])    }

    // useEffect(()=>{

    //     axios.get(`https://api.tvmaze.com/shows/:${id}`)
    //     .then((response)=>{
    //         console.log(response)
    //         console.log(response.data[0])
    //         setMovie(response.data[0])
            
    //     })
    //     .catch((err)=>{
    //         console.log("Something has gone wrong")
    //         console.log(err)
        
    //     })

    // },[])

    async function showMovie(e){
        console.log(e)
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=:${e}`)
        const data = await response.json()
        console.log(data)
        setMovie(data)
    }

    return (
        <div>
            <div className="container">
                <div id="header">
                    <h1>TV SHOWS</h1>
                    <select className='form-control' onChange={(e)=>showMovie(e.target.value)}>
                        <option onChange={(e)=>getMovie(e.target.value)}>
                            Please Select
                        </option>
                        {
                            shows.map((item,idx)=>(
                            <option key={idx}>
                                {item.name}
                            </option>
                                    ))
                        }
                    </select>
                    
                </div>
                <div id="content">
                    <h5 style={{ margin:"20px"}}>You can find movies with selected title here:</h5>
                    {
                        movie.map((item,idx)=>(
                        <div key={idx} className="imgContainer">
                            {item.show.image ? <a href={item.show.url}><img className="h-100 d-inline-block img-hover" style={{width: 200}} src={item.show.image.original}alt="movie-pic" /></a>: "...Loading!"}
                            <p style={{fontWeight:"bold", backgroundColor:"rgba(237, 221, 234, 0.345)", borderRadius:"5px", width:"100%"}}>{item.show.name}</p>
                        </div>
                        ))
                            
                    }

                </div>
            </div>
        </div>
    )
    }

export default ApiBB