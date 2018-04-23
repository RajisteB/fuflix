import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Movies } from './Movies';
import FeaturedSlideShow from './FeaturedSlideShow';
import { API_KEY } from '../config_keys.js'
import Single from './Single';

const playlistBaseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&order=date&type=video'
const key = '&key=';
const channelId = '&channelId=UCUpbgPbDccjoB9PxI-nI7oA';
const playlistId = '&playlistId=PLcG66PDG1cyuZBuU7eeUh4b2nGkudDFRn';
const apiCall = `${playlistBaseUrl}${channelId}${playlistId}${key}${API_KEY}`;
let movie = [];
let feature = [];

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movies: [],
            featured: []
        }
    }

    getPlaylist = (params) => {
        axios.get(params)
            .then(res => {
                let items = res.data.items
                let token = "&pageToken=" + res.data.nextPageToken;

                items.map((item, idx) => {
                    let details = item.snippet;
                    let summary = details.description.split('\n');
                    let title = details.title.split('-').pop().trim();
                    let thumbs = details.thumbnails

                    if (title === 'Private video') {
                        return;
                    } else {
                        movie.push({
                            id: idx,
                            videoId: details.resourceId.videoId,
                            title: title,
                            director: summary[0].trim(),
                            cast: summary[1],
                            description: summary[2],
                            image: thumbs
                        })
                    }
                    return movie;
                })


                if (movie.length < 300) {
                    this.getPlaylist(`${apiCall}${token}`)
                } else {
                    feature.push(movie.splice(movie.length - 4, movie.length - 1));
                    this.setState({
                        movies: movie,
                        featured: feature[0]
                    })
                }
            })
    }

    updateSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount() {
        this.getPlaylist(apiCall);
        
    }

    

    render() {
        let filteredMovies = this.state.movies.filter((movie) => {
            return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
        
        console.log(this.state.featured)
        return (
            <Switch>
                <Route exact path="/movies" render={props => {
                    return (
                        <div>
                            <FeaturedSlideShow feature={this.state.featured}/>
                            <p>Search Page</p>
                            <form>
                                <input type="text" value={this.state.search} onChange={this.updateSearch} />
                            </form>
                            <div>
                                {filteredMovies.map((movie, idx) =>
                                    <div key={idx}>
                                        <div>
                                            <Link to={`/movies/${movie.videoId}`}>
                                                <img src={movie.image.high.url} height="160px" width="100px" alt="" />
                                                <p>{movie.title}</p>
                                                <p>{movie.quality}</p>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                } />
                <Route path="/movies/:id" component={Single} />
            </Switch>
        )
    }

}

export default Search;