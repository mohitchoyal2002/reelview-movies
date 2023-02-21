import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { setMovie } from './features/selectedMovie'
import { useDispatch } from 'react-redux'

const MovieCard = (props) => {

  const {movie} = props

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const getInfo = ()=>{
    dispatch(setMovie(movie))
    navigate('/movieInfo')
  }

  return (
    <Container onClick={getInfo}>
      <Poster src={movie.Poster}/>
      <Info>
        <h4>{movie.Title}</h4>
        <OtherInfo>
          <p>{movie.Year}</p>
          <p id='type'>{movie.Type}</p>
        </OtherInfo>
      </Info>
    </Container>
  )
}

export default MovieCard

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
  // transition: 0.3s ease-in-out;
  &:hover{
    img{
      transform: translateY(-5px);
    }
  }
`

const Poster = styled.img`
  width: 90%; 
  height: 400px;
  object-fit: fill;
  border-radius: 10px;
  transition: 0.4s ease-in-out
`

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 30px;
  h4{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const OtherInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgb(100, 100, 100);
  #type{
    border: 1px solid rgb(100, 100, 100);
    padding: 2px;
    border-radius: 4  px;
  }
`