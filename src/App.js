import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    this.state = {
      breakLength: 300, // in sec 
      workLength: 1500, // in sec,
      type: 'Session',
      date: date,
      currentTime: 1500,
      run: false
    };
    // const url = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';
    // const url1 = 'https://assets.mixkit.co/sfx/preview/mixkit-classic-winner-alarm-1997.mp3';
    // const url2 = 'https://assets.mixkit.co/sfx/preview/mixkit-data-scaner-2847.mp3';
    // this.audio1 = new Audio(url1);
    // this.audio2 = new Audio(url2);

    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.reset = this.reset.bind(this);
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.min = this.min.bind(this);
    this.sec = this.sec.bind(this);
  }

  breakDecrement() {
    let brDec = this.state.breakLength;
    if (brDec >= 120 && this.state.run === false) {
      if (this.state.type === 'Break') {
        brDec = brDec - 60;
        this.setState({
          breakLength: brDec,
          currentTime: brDec
        })
      } else {
          brDec = brDec - 60;
          this.setState({
            breakLength: brDec,
          });
        }
      }
    };
  breakIncrement() {
    let brInc = this.state.breakLength;
    if (brInc < 241 && this.state.run === false) {
      if (this.state.type === 'Break') {
        brInc = brInc + 60;
        this.setState({
          breakLength: brInc,
          currentTime: brInc
        })
      } else {
          brInc = brInc + 60;
          this.setState({
            breakLength: brInc,
          });
        }
      }
    };
     
  sessionDecrement() {
    let sesDec = this.state.workLength;
    if (sesDec >= 120 && this.state.run === false) {
      if (this.state.type === 'Session') {
        sesDec = sesDec - 60;
        this.setState({
          workLength: sesDec,
          currentTime: sesDec
        });
      } else {
        sesDec = sesDec - 60;
        this.setState({
          workLength: sesDec,
        });
      }
    };
  };
  sessionIncrement() {
    let sesInc = this.state.workLength;
    if (sesInc < 1441 && this.state.run === false) {
      if (this.state.type === 'Session') {
        sesInc = sesInc + 60;
        this.setState({
          workLength: sesInc,
          currentTime: sesInc
        })
      } else {
        sesInc = sesInc + 60;
        this.setState({
          workLength: sesInc,
        })
      }
    };
  };
  reset(){
    clearInterval(this.state.clocker);
    this.setState({
      breakLength: 300,
      workLength: 1500,
      currentTime: 1500,
      run: false
    });
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  };

  countDown(){
    if (this.state.currentTime > 0 && this.state.type === 'Session') {
      this.setState({
        currentTime: this.state.currentTime - 1,
        type: 'Session'
      });
    } else if (this.state.currentTime === 0 && this.state.type === 'Session') {
      this.setState({
        currentTime: this.state.breakLength,
        type: 'Break'
      });
      // this.audio1.play();
      document.getElementById('beep').play();
    } else if (this.state.currentTime > 0 && this.state.type === 'Break') {
      this.setState({
        currentTime: this.state.currentTime - 1,
        type: 'Break'
      })
    } else if (this.state.currentTime === 0 && this.state.type === 'Break') {
      this.setState({
        currentTime: this.state.workLength,
        type: 'Session'
      });
      // this.audio2.play();
      document.getElementById('beep').play();
    }
  };

  min(num){
    let min = Math.floor(num / 60);
    return min = min < 10 ? `0${min}` : min; // add leading 0 before min
  };

  sec(num){
    let sec = num % 60;
    return sec = sec < 10 ? `0${sec}` : sec; // add leading 0 before sec
  };

  startTimer(){
    if (this.state.run) {
      clearInterval(this.state.clocker);
      this.setState({
        run: false
      })
    } else {
      let clocker = setInterval(this.countDown, 1000); // plane java script syntax: clocker = setInterval(() => {countDown(); ...}, 1000);
      this.setState({
        clocker: clocker,
        run: true
      })
    }
  }

  render(){
    let inputStyle = {};
    let indicator = {};
    if (this.state.currentTime < 60) {
      inputStyle = {
        color: '#60ff72'
      }
    };
    if (this.state.run) {
      indicator = {
        visibility: 'visible'
      }
    }
    return(
      <div id='timer'>
        <h1>25x5Clock <span className='indicator' style={indicator}>🟢</span></h1>
        <div id='timer-flex'>
          <div id='timer-flex-left'>
            <div className='box' id='break-box'>
              <div className='item1 sm' id='break-label'>Break Length</div>
              <button className='item2 sm' id='break-decrement' onClick={this.breakDecrement}>
                <span>⇩</span>
              </button>
              <div className='item3 sm' id='break-length'>{ this.min(this.state.breakLength)}</div>
              <button className='item4 sm' id='break-increment' onClick={this.breakIncrement}>
                <span>⇧</span>
              </button>
            </div>
            <div className='box' id='session-box'>
              <div className='item1 sm' id='session-label'>Session Length</div>
              <button className='item2 sm' id='session-decrement' onClick={this.sessionDecrement}>
                <span>⇩</span>
              </button>
              <div className='item3 sm' id='session-length'>{ this.min(this.state.workLength) }</div>
              <button className='item4 sm' id='session-increment' onClick={this.sessionIncrement}>
                <span>⇧</span>
              </button>
            </div>
          </div>
          <div id='timer-flex-right'>
            <div className='box-right' id='session-display'>
              <div className='item5 lg' id='timer-label'>{ this.state.type }</div>
              <div className='item6 lg' style={inputStyle}>{`${this.min(this.state.currentTime)}:${this.sec(this.state.currentTime)}`}</div>
              <button className='item7 lg' id='start_stop' onClick={ this.startTimer }>
                <span id='pp'>►❙❙</span>
              </button>
              <button className='item8 lg' id='reset' onClick={ this.reset }>
                <span>⭯</span>
              </button>
            </div>
          </div>
        </div>
        <div className='float'>{ this.state.date }
          <audio id='beep' preload="auto" src='https://assets.mixkit.co/sfx/preview/mixkit-data-scaner-2847.mp3'/>
        </div>
      </div>
    )
  }
}

export default App;
