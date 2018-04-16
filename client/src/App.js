import React, { Component } from 'react';
import Video from './components/Video';
import Search from './components/Search';
import axios from 'axios';
import { API_KEY } from './config_keys.js'
import './App.css';

const playlistBaseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId='
const playlistOpts = '&part=snippet&maxResults=50';
const channel = 'UUXeFop7x3vyUAe_O7gliRkA';

//https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUXeFop7x3vyUAe_O7gliRkA&key=AIzaSyC7T-G2CrUaaEhADzXB63TvgUUA0s3yvkg&part=snippet&maxResults=50 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      movies: {}
    }
  }
  
  getPlaylist = () => {
    // Youtube API get request...
    axios.get(`${playlistBaseUrl}${channel}&key=${API_KEY}${playlistOpts}`)
      .then(res => {
        let movies = res.data.items;
        let moviesData = [];
        movies.forEach((movie, idx) => {

          // Get movie title in normal case as movie data returns title in uppercase.
          let name = movie.snippet.title
          let nameSplit = name.toLowerCase().split('|');
          let movieNameSplit = nameSplit[0].split(' ');
          let rmvMovieTitleWhteSpce = movieNameSplit.slice(0, (movieNameSplit.length - 1));
          let title = '';

          rmvMovieTitleWhteSpce.forEach((mov, idx) => {
            if (idx !== rmvMovieTitleWhteSpce.length - 1) {
              return title += mov.charAt(0).toUpperCase() + mov.slice(1) + ' ';
            } else {
              return title += mov.charAt(0).toUpperCase() + mov.slice(1);
            }          
          })

          // Push movie data as object to moviesData array
          moviesData.push({
            id: idx,
            title: title,
            description: movie.snippet.description,
            videoId: movie.snippet.resourceId.videoId,
            thumbnail: movie.snippet.thumbnails.standard.url
          })
        });
        this.setState({
          data: moviesData
        })
        console.log(this.state.data);
      }).catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getPlaylist();
  }


  render() {
    let data = this.state.data;

    return (
      <div>
        <Search movies={data}/>
      </div>
    );
  }

}

export default App;
