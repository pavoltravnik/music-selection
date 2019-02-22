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
      givenRating: false
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

  rateTrack(like, givenRating, path, next) {
    // Give rating if not rated yet
    if (this.state.givenRating !== true && next !== true) {
    fetch(`${hostName}:${port}/api/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "url": path,
          "like": like,
          "givenRating": givenRating,
          "date": new Date(),
        }),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
      this.setState({
        givenRating: true
      });
    }

    // New track load if
    if ( !(like === true && givenRating === true) || next === true ) {
      fetch(`${hostName}:${port}/api/likes`)
        .then(res => res.json())
        .then(
          (result) => {
            const url = result[0] ? `/${result[0].album}/${result[0].url}` : null;
            const thumbnail = result[0] ? `/${result[0].album}/${result[0].thumbnail}` : null;
            this.setState({
              url,
              thumbnail,
              givenRating: false
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
    const givenRating = this.state.givenRating;
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
            <audio id="myAudio" src={path} preload="auto" onEnded={() => this.rateTrack(true, false, track, false)} controls autoPlay/>
        </div>
        <div className="buttons">
          <div className="float">
            <button className="button like-button" onClick={ givenRating ?  null : () => this.rateTrack(true, true, track, false)}>Like</button>
          </div>
          <div className="float">
            <button className="button dislike-button" onClick={() => this.rateTrack(false, true, track, false)}>Dislike</button>
          </div>
          <div className="float">
            <button className="button next-button" onClick={() => this.rateTrack(false, false, track, true)}>>></button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;