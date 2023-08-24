import React from "react";

class App extends React.Component {
    state = {
        hour: 0,
        minute: 0,
        secund: 0,
        interval: "",
        startDisabled: false,
        stopDisabled: true,
        intervalTime: [],
        activeClass: "circle-anim-content"
    }

    start = () => {
        let stopWatch = setInterval(() => {
            const {hour, minute, secund} = this.state;
            if (secund === 59){
                if (minute === 59){
                    this.setState({
                        hour: hour + 1,
                        minute: 0,
                        secund: 0,
                    });
                } else {
                    this.setState({
                        secund: 0,
                        minute: minute + 1,
                    });
                }
                
            } else {
                this.setState({
                    secund: secund + 1,
                }) 
            }     
        }, 1000);
        this.setState({
            interval: stopWatch,
            startDisabled: true,
            stopDisabled: false,
            activeClass: "circle-anim-content active"
        });
    }

    stop = () => {
        let stopInterval = clearInterval(this.state.interval)
        this.setState({
            interval: stopInterval,
            stopDisabled: true,
            startDisabled: false,
            activeClass: "circle-anim-content"
        })
    }

    interval = () => {
        const {hour, minute, secund, intervalTime} = this.state;
        let intervalText = `${hour} : ${minute} : ${secund}`;
        console.log(intervalText);
        intervalTime.push(intervalText);
        this.setState({
            intervalTime,
        })
    }

    clear = () => {
        let stopInterval = clearInterval(this.state.interval)
        this.setState({
            hour: 0,
            minute: 0,
            secund: 0,
            interval: stopInterval,
            startDisabled: false,
            stopDisabled: true,
            intervalTime: [],
            activeClass: "circle-anim-content"
        })
    }

    render() {
        const {hour, minute, secund, startDisabled, stopDisabled, intervalTime, activeClass} = this.state;
        return (
            <div className="container">
                {/* Title */}
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <h1>Online Stop Watch ⌚</h1>
                    </div>
                </div>
                {/* StopWatch */}
                <div className="circle-anim">
                    <div className={activeClass}>                  
                    </div>
                    <div className="row circle">                  
                        <div className="col-8 circle-content">
                            <div className="row watch-content text-center">
                                <div className="col-4">
                                    <h1 className="time">{hour}</h1>
                                    <h1 className="time-text">H</h1>
                                </div>
                                <div className="col-4">
                                    <h1 className="time">{minute}</h1>
                                    <h1 className="time-text">M</h1>
                                </div>
                                <div className="col-4">
                                    <h1 className="time">{secund}</h1>
                                    <h1 className="time-text">S</h1>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
                {/* Buttons */}
                <div className="row">
                    <div className="col-6 offset-3 text-center">
                        <button className="btn btn-success" disabled={startDisabled} onClick={this.start}>Start</button>
                        <button className="btn btn-danger" disabled={stopDisabled} onClick={this.stop}>Stop</button>
                        <button className="btn btn-primary" onClick={this.interval}>Interval</button>
                        <button className="btn btn-warning" onClick={this.clear}>Clear</button>
                    </div>
                </div>
                {/* Interval */}
                <div className="row mt-3">
                    <div className="col-6 offset-3 interval text-center">
                        {
                            intervalTime.map((item, index) => {
                                return (
                                    <h4>{index + 1} ⏱️ {item}</h4>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;