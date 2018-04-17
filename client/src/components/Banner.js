import React, { Component } from 'react';
import axios from 'axios';
import { API_SEARCH_KEY, CX_KEY } from '../config_keys.js';

let customSearchBaseUrl = 'https://www.googleapis.com/customsearch/v1?key=';
let customSearchOpts = '&searchType=image&q='; 

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerImg: ''
        }
    }

    getMovieImg = (title) => {
        axios.get(`${customSearchBaseUrl}${API_SEARCH_KEY}&cx=${CX_KEY}${customSearchOpts}${title}&imgSize=large&num=10`)
            .then(res => {
                let movies = res.data.items;
                let image = movies.find(movie => movie.image.width > 1200);
                this.setState({
                    bannerImg: movies,
                })
            })
    }


    render() {
        let title = this.props.single.title;
        this.getMovieImg(title);
        return (
            <div>

            </div>
        )
    }
}

export default Banner;