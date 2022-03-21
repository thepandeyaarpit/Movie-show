import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

const CustomPagination = ({setPage, numOfPages = 10 }) =>{

    const HandlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return(
        <ThemeProvider theme={darkTheme}>

        <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "10"}}>
            <Pagination count={numOfPages} onChange={(e) => HandlePageChange(e.target.textContent)} 
                hideNextButton hidePrevButton color='primary'
            />
        </div>
        </ThemeProvider>
    )
}

export default CustomPagination;