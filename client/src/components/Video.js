import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';

    // class Vidz extends Component {
    //     _onReady(e) {
    //         e.target.playVideo();
    //     }

    //     render() {
    //         const opts = {
    //             height: '390',
    //             width: '640',
    //             playerVars: {
    //                 autoplay: 1,
    //                 start: 1,
    //                 showInfo: 0,
    //                 modestBranding: 1,
    //             }
    //         };

    //         return (
    //             //<YouTube videoId="SkR7Wdn3Cb8" opts={opts} onReady={this._onReady} />
    //             <div>
    //                 <p>Video</p>
                    
    //             </div>
    //         );
    //     }
    // }   

const Video = ({ match }) => {
    return (
        <div>
            <p>Video</p>
            {match.params.id}
        </div>
    )

}

export default withRouter(Video);