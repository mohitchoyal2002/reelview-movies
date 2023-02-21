import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { result, setResult } from "./features/searchResultSlice";
import MovieCard from "./MovieCard";
import axios from "axios";

function SearchResult() {
  const [movieName, setMovieName] = useState("");
  const allMovies = useSelector(result);

  const renderMovieCard = allMovies.map((movie, index) => {
    return <MovieCard movie={movie} key={index} />;
  });

  const dispatch = useDispatch();

  // const [page, setPage] = useState(1);
  const [noMovie, setMovie] = useState(false)

  const searchMovie = async (e) => {
    e.preventDefault();
    const url = "http://www.omdbapi.com/?apikey=8153a34a&s=";
    try {
      const res = await axios.get(`${url}${movieName}`);
      if(res.data.Response === 'True'){
        let movies = res.data.Search;
        const res2 = await axios.get(`${url}${movieName}&page=2`);
        if(res2.data.Response === 'True'){
          console.log(res.data);
          movies = movies.concat(res2.data.Search);
        }
        // console.log(movies);
        dispatch(setResult(movies));
      }
      else{
        dispatch(setResult([]))
        setMovie(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(noMovie === true){
      const con = document.getElementById('main')
      con.style.height = '100vh';
      con.style.alignItems='center';
      // con.style.justifyContent='center';
      // con.childNodes
      document.getElementById('msg').innerHTML = 'No Movies Found'
    }

  }, [noMovie])

  return (
    <Container id="main">
      <Header>
        <Logo></Logo>
        <Menu>
          <CustomLink to="">Home</CustomLink>
          <CustomLink to="">Top IMDB</CustomLink>
          <CustomLink to="">TV Shows</CustomLink>
        </Menu>
        <Search>
          <form onSubmit={searchMovie}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setMovieName(e.target.value)}
              value={movieName}
            />
            <button>
              <SearchIcon />
            </button>
          </form>
        </Search>
      </Header>
      
      <Filter>
        <h1>Search Result :</h1>
        {/* <Links>
          <button id="active">All</button>
          <button>Movies</button>
          <button>TV Shows</button>
        </Links> */}
      </Filter>
      <h1 id="msg"> </h1>
      <Movies>{renderMovieCard}</Movies>
    </Container>
  );
}

export default SearchResult;

const Container = styled.div`
  padding: 10px 50px;
  width: 100vw;
  background: #181818;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  gap: 50px;
  // transition: all 0.4s ease-in-out;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
`;

const Logo = styled.div`
  background-image: url("/images/logo-2.svg");
  background-size: cover;
  packground-position: center;
  background-repeat: no-repeat;
  height: 110px;
  width: 250px;
  border-radius: 10px;
  @media (max-width: 600px) {
    height: 80px;
    width: 160px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Search = styled.div`
  display: flex;
  align-items: center;

  form {
    display: flex;
    align-items: center;
  }

  input {
    border: none;
    height: 40px;
    padding: 5px 20px;
    border-radius: 5px 0 0 5px;
  }
  input:focus {
    outline: none;
  }

  button {
    border: none;
    height: 40px;
    width: 50px;
    border-radius: 0 5px 5px 0;
    background: rgba(242, 56, 58, 1);
    color: #fff;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  h1 {
    font-weight: 300;
    color: rgb(200, 200, 200);
  }

  button {
    height: 25px;
    width: 100px;
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const Links = styled.div`
  display: flex;
  border-radius: 7px;

  button {
    border: none;
    background: #424141;
    color: #fff;
    cursor: pointer;
  }
  #active {
    background: rgba(242, 56, 58, 1);
  }
`;

const Movies = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 20% 20% 20% 20% 20%;
  @media (max-width: 980px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
  @media (max-width: 850px) {
    grid-template-columns: 33.3% 33.3% 33.3%;
  }
  @media (max-width: 600px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 500px) {
    grid-template-columns: 100%;
  }
`;

// const SwitchPage = styled.div``;
