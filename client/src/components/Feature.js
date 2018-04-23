import React, { Component } from 'react';

class Feature extends Component {
    constructor(props) {
        super(props);
    }

    featureImg = (props) => {
        if (props) {
            let film = props.image;
            let image = film['high'].url;
    
            let background = {
                backgroundImage: 'url(' + image + ')',
                backgroundSize: '100% 140%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }
    
            return (
                <div className="slider-container" style={background}>
                    <div className="slider-nav">
                        <a onClick={this.props.prev} id="prev"></a>
                        <a onClick={this.props.next} id="next"></a>
                    </div>
                    <div className="overlay"></div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.featureImg(this.props.single)}
            </div>
        )
    }

}

export default Feature
