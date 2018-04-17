import React, { Component } from 'react';
import Search from './components/Search';
import axios from 'axios';
import { API_KEY } from './config_keys.js'
import './App.css';

const playlistBaseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='
const playlistOpts = '&maxResults=50&order=date&type=video&key='
const channel = 'UCXeFop7x3vyUAe_O7gliRkA';

//https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUXeFop7x3vyUAe_O7gliRkA&key=AIzaSyC7T-G2CrUaaEhADzXB63TvgUUA0s3yvkg&part=snippet&maxResults=50 

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      movies: {},
    }
  }
  
  getPlaylist = () => {
    // Youtube API get request...
    axios.get(`${playlistBaseUrl}${channel}${playlistOpts}${API_KEY}`)
      .then(res => {
        let movies = res.data.items;
        console.log(movies);
        let moviesData = [];

        // Iterate through data response
        movies.forEach((movie, idx) => {
          let film = movie.snippet;
          let movieName = film.title.split('|');
          let movieTitle = [];
          let fullTitle = '';

          // Title case for movie titles vs all uppercase as given by data
          let lowercaseTitle = movieName[0].split('-')[0].toLowerCase().trim().split(' ');
          lowercaseTitle.forEach((title) => {
            movieTitle.push(title.charAt(0).toUpperCase() + title.slice(1));
            
          })
          fullTitle = movieTitle.join(' ');

          // Remove hyphens from description
          let description = film.description.replace(/-/g,"");
        
          // Get type of quality (HD, 720, or Classics)
          let version = movieName.pop()
          let regex = /[a-z0-9]+$/i;
          let quality = '';

          // Changes Asian type characters to 'Classics'
          if (!regex.test(version)) {
            quality = 'Classics';
          } else {
            quality = version;
          }

          // Push movie data as object to moviesData array
          moviesData.push({
            id: idx,
            title: fullTitle,
            // director: director,
            // cast: 'director',
            description: description,
            quality: quality,
            videoId: movie.id.videoId,
            thumbnail: film.thumbnails.high.url
          })
        });
        this.setState({
          data: moviesData,
        })
        console.log(moviesData);
      }).catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getPlaylist();
  }


  render() {

    return (
      <div>
        <Search movies={this.state.data}/>
      </div>
    );
  }

}

export default App;
