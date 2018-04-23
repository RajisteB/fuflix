import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ReactDOM, {findDOMNode} from 'react-dom';
import Feature from './Feature';



class FeaturedSlideShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            slideCount: 1,
        }
    }

    nextSlide = () => {
        if (this.state.slideCount < (this.props.feature.length - 1)) {
            this.setState({
                slideCount: this.state.slideCount + 1
            })
        } else {
            this.setState({
                slideCount: 0
            })
        }

        console.log('Pressing next...');
        console.log(this.state.slideCount);
    }

    prevSlide = () => {
        if (this.state.slideCount <= 0) {
            this.setState({
                slideCount: 3,
            })
        } else {
            this.setState({
                slideCount: this.state.slideCount - 1,
            })
        }
    }

    render() {
        let { feature } = this.props;
        return (
            <div className="banner">
                <div className="slider">
                    {this.state.slideCount === 0 ? <Feature single={this.props.feature[0]} prev={this.prevSlide} next={this.nextSlide}/> : null}
                    {this.state.slideCount === 1 ? <Feature single={this.props.feature[1]} prev={this.prevSlide} next={this.nextSlide}/> : null}
                    {this.state.slideCount === 2 ? <Feature single={this.props.feature[2]} prev={this.prevSlide} next={this.nextSlide}/> : null}
                    {this.state.slideCount === 3 ? <Feature single={this.props.feature[3]} prev={this.prevSlide} next={this.nextSlide}/> : null}
                </div>
            </div>
        )
    }
}

export default FeaturedSlideShow;