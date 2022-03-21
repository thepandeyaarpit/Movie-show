import React, { useEffect } from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...setSelectedGenres,genres]);
        setGenres(genres.filter((g)=>g.id !== genre.id));
    }

    const fetchGenres = async () => {
        const { data } =  await axios.get(`
        https://api.themoviedb.org/3/genre/${type}/list?api_key=c68a1ae6cf4bf26f51ac572b17ea3fe7&language=en-US
        `);
        setGenres(data.genres);
    };

    console.log(genres);

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        };
    }, []);

    return(
        <div style={{padding: "6px 0"}}>
            {genres && genres.map((genre) => 
                <Chip label={genre.name} style={{margin: 2}} size='small' key={genre.id} clickable />
            )}
        </div>
    )
}

export default Genres;