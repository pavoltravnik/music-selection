/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './App.css';
import { config } from './config.js';

const { hostName, hostMusic, port } = config;

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: null,
      item : { thumbail : null, album: null },
      rated: false
    }
    this.rateTrack = this.rateTrack.bind(this);
  }

  componentDidMount() {
    fetch(`${hostName}:${port}/api/likes`)
    .then(res => res.json())
    .then(
      (result) => {
        const url = result[0] ? `/${result[0].album}/${result[0].url}` : null;
        const thumbnail = result[0] ? `/${result[0].album}/${result[0].thumbnail}` : null;
        this.setState({
          url,
          thumbnail
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  rateTrack(like, givenRating ,path) {
    // 
    if(this.state.rated === false || like === false) {
      fetch(`${hostName}:${port}/api/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "url": path,
            "like": like,
            "givenRating": givenRating
          }),
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
      this.setState({
        rated: true
      });
      
    }
    // New track load
    if( like !== true && givenRating === true ) {
      fetch(`${hostName}:${port}/api/likes`)
        .then(res => res.json())
        .then(
          (result) => {
            const url = result[0] ? `/${result[0].album}/${result[0].url}` : null;
            const thumbnail = result[0] ? `/${result[0].album}/${result[0].thumbnail}` : null;
            this.setState({
              url,
              thumbnail,
              rated: false
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }
  }

  render() {
    const url = `${hostMusic}/music`;
    const track = this.state.url
    const path = url + track;
    const path_img = url + this.state.thumbnail;
    const rated = this.state.rated;
    return (
      <div className="App">
        <div>
          { this.state.thumbnail &&
              <div className="container">
                <img src={path_img} />
              </div>
          }
        </div>
        <div>
            <audio id="myAudio" src={path} preload="auto" onEnded={() => this.rateTrack(true, false, track)} controls autoPlay/>
        </div>
        <div className="buttons">
          <div className="float">
            <button className="button like-button" onClick={ rated ?  null : () => this.rateTrack(true, true, track)}>Like</button>
          </div>
          <div className="float">
            <button className="button dislike-button" onClick={() => this.rateTrack(false, true, track)}>Dislike</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;