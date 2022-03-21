import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent'; 
import './Trending.css';
import CustomPagination from '../../components/Pagination/CustomPagination';
const Trending = () => {

  const [page, setPage] = useState(1);

  const [content, setContent] = useState([]);

  const fetchTrending = async () =>{

    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=c68a1ae6cf4bf26f51ac572b17ea3fe7&page=${page}`
    );

    setContent(data.results);

  };

  useEffect(() => {
    fetchTrending();
  }, [page])

  return (
    <div>
    <span className="pageTitle">Trending</span>
      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent 
            key={c.id} id={c.id}
            poster={c.poster_path}
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date} 
            media_type={c.media_type}
            vote_average={c.vote_average}
            />
          ))
        }
      </div>
        <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending;