import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "4b268f62f874ba4abe685006a5f1d24c";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "movie/upcoming";
const nowPlaying = "movie/now_playing";
const popular = "movie/popular";
const topRated = "movie/top_rated";

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
);

const Row = ({ title, arr = [] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    const getAllGenres = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenres(genres);
    };

    getAllGenres();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage:popularMovies[0]?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16)"
      }}>
        {
            popularMovies[0] &&
            (
                <h1>{popularMovies[0].original_title}</h1>
            )
        }
{
    popularMovies[0] && (
        <p>{popularMovies[0].overview}</p>
    )
}
<div>
<button> <BiPlay/> Play  </button>
<button>My List <AiOutlinePlus/> </button>
</div>



       
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genreBox">
        {genres.map((genre) => (
          <Link key={genre.id} to={`/genre/${genre.id}`}>{genre.name}</Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
