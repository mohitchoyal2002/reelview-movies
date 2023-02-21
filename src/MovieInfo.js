import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {movieDetail} from './features/selectedMovie'
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieInfo = () => {

  const movie = useSelector(movieDetail)

  const [load, setLoad] = useState(true)

  const [info, setInfo] = useState();

  const getMovieDetail = async()=>{
    const url = 'http://www.omdbapi.com/?apikey=8153a34a&t='
    const res = await axios.get(`${url}${movie.Title}`)
    console.log(res.data);
    
    setInfo(res.data)
    
    setLoad(false)
  } 
  useEffect(()=>{
    getMovieDetail()
  }, [])

  if(load){
    return(
    <Load>
      <img src="/images/loading.svg" alt="" />
    </Load>
    )
  }
  else{
    return (
      <Container>
        <CustomLink to = '/'><ArrowBackIcon/> Go Back</CustomLink>
        <Poster src={info.Poster}/>
        <Info>
          <h1>{info.Title}</h1>
          <Rating>
            <span>HD</span>
            <p><StarIcon fontSize='small'/> {info.imdbRating}</p>
            <p>{info.Runtime}</p>
            <p id = 'type'>{info.Type}</p>
          </Rating>
          <Plot>{info.Plot}</Plot>
          <OtherInfo>
            <p>IMDB:  <span>{info.imdbRating}</span></p>
            <p>Rated:  <span>{info.Rated}</span></p>
            <p>Country:  <span>{info.Country}</span></p>
            <p>Languages:  <span>{info.Language}</span></p>
            <p>Genre:  <span>{info.Genre}</span></p>
            <p>Release:  <span>{info.Released}</span></p>
            <p>Director: <span>{info.Director}</span></p>
            <p>Cast:   <span>{info.Actors}</span></p>
            <p>Awards:  <span>{info.Awards}</span></p>
          </OtherInfo>
        </Info>
      </Container>
    )
  }
}

export default MovieInfo

const Container = styled.div`
  font-family: 'Montserrat';
  background: #181818;
  padding: 100px;
  height: 100vh;
  color: #fff;
  display: flex;
  gap: 50px;
  @media(max-width: 1000px){
    padding: 100px 30px;
  }
  @media(max-width: 760px){
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`

const Load = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #181818;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Poster = styled.img`
  width: 30%;
  height: 70%;
  border-radius: 20px;
  box-shadow: 0 0 0 4px rgba(100, 100, 100, 0.9);
  @media(max-width: 900px){
    height: 60%;
  }
  @media(max-width: 760px){
    width: 60%;
  }
  
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 10px;

  @media(max-width: 860px){
    width: 100%;
  }
  
`
const Rating = styled.div`
  width: 90%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  span{
    padding: 3px 10px;
    background: rgba(242,56,58,1);
    border-radius: 20px;
    color: #181818;
    font-size: 0.7rem;
    font-weight: 700;
  }
  h1{
    font-size: 2rem;
  }
  p{
    display: flex;
    gap: 10px;
    align-items: center;
    color: rgb(120, 120, 120);
    font-weight: 600;
  }
  #type{
    border 1px solid rgb(120, 120, 120);
    padding: 2px;
    font-size: 0.8rem;
    border-radius: 3px;
  }
`

const OtherInfo = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px; 
  width: 90%;
  color: rgb(120, 120, 120);
  font-weight: 600;
  span{
    margin-left: 5px;
    font-size: 0.9rem;
  }
  
`
const Plot = styled.p`
  margin-top: 50px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: rgb(120, 120, 120);
`

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(120, 120, 120);
  text-decoration: none;
  position: absolute;
  top: 50px;
  left: 50px;
  @media(max-width: 760px){
    font-size: 0.7rem;
    svg{
    font-size: 0.7rem;
    }
    
  }
`