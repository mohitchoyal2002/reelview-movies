import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { setResult } from "./features/searchResultSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


function Home() {
  const [movieName, setMovieName] = useState("");
  

  const dispatch = useDispatch()

  const searchMovie = async(e) => {
    e.preventDefault()
    const url = 'http://www.omdbapi.com/?apikey=8153a34a&s='
    try{
      const res = await axios.get(`${url}${movieName}`)
      console.log(res.data.Response);
      if(res.data.Response === 'True'){
        let movies = res.data.Search
        const res2 = await axios.get(`${url}${movieName}&page=2`)
        movies = movies.concat(res2.data.Search)
        dispatch(setResult(movies))

      }else{
        document.getElementById('msg').innerHTML = 'Movie Not Found !'
      }
      // console.log(movies);
    }
    catch(err){
      console.log(err);
    }    
  };
  return (
    <Container>
      <Logo></Logo>
      <Search>
        <h1 id="msg"> </h1>
        <form>
          <input
            type="text"
            autoFocus
            placeholder="Search For a Movie... "
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
            value={movieName}
          />
          <button onClick={searchMovie}>
            <SearchIcon fontSize="large" id="btn" />
          </button>
        </form>
      </Search>

      <Footer>copyright reelView, Made by Mohit</Footer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding: 100px;
  background: #181818;
  font-family: "Montserrat", sans-serif;
  @media(max-width: 600px){
    padding: 30px;
  }
`;
const Logo = styled.div`
  height: 300px;
  width: 500px;
  background: url("/images/logo.svg");
  background-poition: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;

  @media(max-width: 600px){
    height: 200px;
    width: 300px;
    padding: 20px;
  }
`;
const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  #msg{
    color: red;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  form{
    display: flex;
    justify-content: center;
    width: 100%;
  }

  input {
    height: 55px;
    width: 70%;
    font-size: 1.1rem;
    border-radius: 7px 0 0 7px;
    padding: 7px 20px;
    border: none;
  }
  input:focus {
    outline: none;
  }

  button {
    height: 55px;
    width: 80px;
    background: rgba(242, 56, 58, 1);
    border: none;
    border-radius: 0 7px 7px 0;
    cursor: pointer;
  }

  #btn {
    color: white;
  }
  @media(max-width: 600px){
    width: 100%;
    input{
      height: 40px;
      width: 100%;
    }
    button{
      height: 40px;
    }
    
  }

  @media(max-width: 500px){
    width: 100%;
    input{
      font-size: 0.9rem;
      width: 100%;
      padding: 0 5px;
    }
    button{
      width: 50px;
      svg{
        font-size: 1.5rem;
      }
    }
  }
`;

const Footer = styled.p`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(200, 200, 200);
  font-size: 12px;
`;
