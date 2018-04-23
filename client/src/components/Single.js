import React, { Component } from 'react';
import { withRouter } from 'react-router';
import YouTube from 'react-youtube';
import { API_KEY } from '../config_keys.js'
import axios from 'axios';

const videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails';
const key = `&key=${API_KEY}`;
const id = '&id='

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            likes: 0,
            dislikes: 0,
            favorites: 0,
            stars: 0,
            duration: '',
            views: '',
            title: '',
            director: '',
            cast: '',
            description: '',
            image: '',
            dataLoaded: false,
            userWillLike: true,
            userWillFave: true
        }
    }

    getVideo = (videoId) => {
        axios.get(`${videoUrl}${id}${videoId}${key}`)
            .then(res => {
                let data = res.data.items[0];
                let stats = data.statistics;
                let details = data.snippet;
                let summary = details.description.split('\n');
                let title = details.title.split('-').pop().trim();
                let thumbs = details.thumbnails;
                let duration = data.contentDetails.duration;
                let views = parseInt(stats.viewCount, 10).toLocaleString();
                let length = duration.split('').slice(2, 7);
                length[1] = 'Hour';
                length[4] = 'Minutes';
                length[2] = length[2] + length[3];
                length[3] = length[4];
                length.pop();
                let videoLength = length.join(' ');
                let localLikes = localStorage[`${data.id}-likes`];
                let localDislikes = localStorage[`${data.id}-dislikes`];
                let faves = localStorage[`${data.id}-favorites`];
    
                if (localLikes > parseInt(stats.likeCount, 10)) {
                    this.setState({
                        likes: localLikes,
                        userWillLike: false,
                    })
                } else {
                    this.setState({
                        likes: parseInt(stats.likeCount, 10)
                    })
                }

                if (localDislikes > parseInt(stats.dislikeCount, 10)) {
                    this.setState({
                        dislikes: localDislikes,
                        userWillLike: false,
                    })
                } else {
                    this.setState({
                        dislikes: parseInt(stats.dislikeCount, 10)
                    })
                }

                if (faves > parseInt(stats.favoriteCount, 10)) {
                    let colors = document.getElementById('favorites');
                    colors.style.color = 'red';
                    this.setState({
                        favorites: faves,
                        userWillFave: false,
                    })
                } else {
                    this.setState({
                        favorites: parseInt(stats.favoriteCount, 10)
                    })
                }
                
                let stars = Math.floor(this.state.likes / this.state.dislikes);
                
                this.setState({
                    id: data.id,
                    duration: videoLength,
                    stars: stars,
                    views: views,
                    title: title,
                    director: summary[0].trim(),
                    cast: summary[1],
                    description: summary[2],
                    image: thumbs,
                    dataLoaded: true
                })



            })

    }

    handleUserLike = () => {
        if (this.state.userWillLike) {
            this.setState({
                userWillLike: false,
                likes: this.state.likes + 1,
            })
            localStorage.setItem(`${this.state.id}-likes`, this.state.likes + 1);
        }
    }

    handleUserDislike = () => {
        if (this.state.userWillLike) {
            this.setState({
                userWillLike: false,
                dislikes: this.state.dislikes + 1,
            })
            localStorage.setItem(`${this.state.id}-dislikes`, this.state.dislikes + 1);
        }
    }

    handleUserFavorite = () => {
        if(this.state.userWillFave) {
            let faves = document.getElementById('favorites');
            faves.style.color ='red';
            this.setState({
                userWillFave: false,
                favorites: this.state.favorites + 1
            })
            localStorage.setItem(`${this.state.id}-favorites`, this.state.favorites + 1);
        }
    }

    stars = (props) => {
        let numOfStars = this.state.stars;
        let deathStars = [];

        if (numOfStars > 5) {
            numOfStars = 5;
        } else if (numOfStars < 0) {
            numOfStars = 0;
        }

        for (let i=0; i < numOfStars; i++) {
            deathStars.push(<div key={i} className="stars"></div>)
        }

        return (
            <span>
                {deathStars}
            </span>
        )
    }

    _onReady = (e) => {
        e.target.playVideo();
    }

    componentDidMount() {
        let { match } = this.props;
        this.getVideo(match.params.id);
    }


    render() {
        console.log(this.state);
        const opts = {
                height: '390',
                width: '640',
                playerVars: {
                    autoplay: 0,
                    start: 1,
                    showInfo: 0,
                    modestBranding: 1,
                }
            };

        return (
            <div>
                <YouTube videoId={this.state.id} opts={opts} onReady={this._onReady} />
                <div>
                    <div className="stats">
                        <span className="fa-layers">
                            <i className="far fa-thumbs-up fa-2x" onClick={this.handleUserLike}></i>
                            <span className="fa-layers-counter">{this.state.likes}</span>
                        </span>
                        <br />
                        <span className="fa-layers">
                            <i className="far fa-thumbs-down fa-2x" onClick={this.handleUserDislike}></i>
                            <span className="fa-layers-counter">{this.state.dislikes}</span>
                        </span>
                        <br />
                        <span className="fa-layers">
                            <i className="fas fa-heart fa-2x" id="favorites" onClick={this.handleUserFavorite}></i>
                            <span className="fa-layers-counter">{this.state.favorites}</span>
                        </span>
                        <br />
                        {this.stars()}
                        <br />
                        <span className="fa-layers fa-fw">
                            <i className="fas fa-eye fa-2x"></i>
                            <span className="fa-layers-counter">{this.state.views}</span>
                        </span>
                        <br />
                        <span className="fa-layers fa-fw">
                            <i className="far fa-clock fa-2x"></i>
                            <span className="fa-layers-counter">{this.state.duration}</span>
                        </span>
                    </div>
                    <div className="video-summary">
                        <h3>{this.state.title}</h3>
                        <h5>{this.state.director}</h5>
                        <h5>{this.state.cast}</h5>
                        <h6>{this.state.description}</h6>
                    </div>
                </div>
            </div>
        )
    }
} 

export default withRouter(Single);