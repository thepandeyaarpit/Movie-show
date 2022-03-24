import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent'; 
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies=async()=>{
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=c68a1ae6cf4bf26f51ac572b17ea3fe7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    // console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres 
        type="tv" 
        selectedGenres={selectedGenres} 
        setSelectedGenres={setSelectedGenres} 
        genres={genres} 
        setGenres={setGenres} 
        setPage={setPage}
      />
      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent 
            key={c.id} id={c.id}
            poster={c.poster_path}
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date} 
            media_type="tv"
            vote_average={c.vote_average}
            />
          ))
        }
      </div>
      {numOfPages>1 &&(
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
    </div>
  )
}

export default Series;