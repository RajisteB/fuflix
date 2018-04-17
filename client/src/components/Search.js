import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: e.target.value
        })
    }

    render() {
        let filteredMovies = this.props.movies.filter((movie) => {
            return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })

        return (
            <div>
                <form>
                    <input type="text" value={this.state.search} onChange={this.updateSearch}/>
                </form>
                <div>
                    {filteredMovies.map(movie => 
                        <div key={movie.id}>
                            <img src={movie.thumbnail} height="160px" width="100px" alt=""/>
                            <p>{movie.title}</p>
                            <p>{movie.quality}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

export default Search;