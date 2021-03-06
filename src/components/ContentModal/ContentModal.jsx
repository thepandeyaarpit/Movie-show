import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Carousel from "../Carousel/Carousel";
import { Badge } from '@material-ui/core';

const useStyles = makeStyles((theme, vote_average) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "95%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id, vote_average }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=c68a1ae6cf4bf26f51ac572b17ea3fe7&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=c68a1ae6cf4bf26f51ac572b17ea3fe7&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" style={{ cursor: "pointer" }} color="inherit" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <Badge badgeContent={vote_average} color={vote_average>6?'primary':'secondary'} />
                  {/* Rating */}
                  {/* Add your Review */}
                  <div className="review_rate">
                    <div>
                      <p>Add your Rating and Review</p>
                    </div>
                    <div>
                      <button className="button_review">Rate Now</button>
                    </div>
                  </div>

                  {/* <span className="ContentModal__description">
                    {content.overview}
                  </span> */}

                  <div>
                    <ThumbUpAltIcon className="ContentModal__extraIcon" style={{fontSize: 30}} />
                    <FavoriteIcon className="ContentModal__extraIcon" style={{fontSize: 30}} />
                    <BookmarkIcon className="ContentModal__extraIcon" style={{fontSize: 30}} />
                    <PlaylistAddIcon className="ContentModal__extraIcon" style={{fontSize: 30}} />
                  </div>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    // href={`https://www.youtube.com/watch?v=${video}`}
                    style={{marginTop: '2px'}}
                  >
                    Watch Movie
                  </Button>

                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}