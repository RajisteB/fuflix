import React, { Component } from 'react';

class Search extends React.Component {
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
        console.log(filteredMovies);
        return (
            <div>
                <form>
                    <input type="text" value={this.state.search} onChange={this.updateSearch}/>
                </form>
                <div>
                    {filteredMovies.map(movie => 
                        <div key={movie.id}>
                            <img src={movie.thumbnail} height="160px" width="100px" />
                            <p>{movie.title}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

export default Search;