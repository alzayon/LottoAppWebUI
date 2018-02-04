import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class NumberDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="numbersDisplay">
                {/* https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react */}
                {this.props.numbers.map((num, i) => {
                    return <span key={i}> {num} </span>
                })}
            </div>
        );
    }
}



class GenerateLuckyPick extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartRangeChange = this.handleStartRangeChange.bind(this);
        this.handleEndRangeChange = this.handleEndRangeChange.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
    }

    componentWillMount() {
        this.setState({
            rangeStart: 1,
            rangeEnd: 65,
            numbers:[1, 2, 3]
        });
    }

    handleSubmit(e) {
        //generate six numbers
        var numbers = [];
        for(var i = 0; i < 6; i++) {
            var randomNumber
                = this.getRandomInt(this.state.rangeStart, this.state.rangeEnd);
            numbers.push(randomNumber);
        }

        //WARNING
        //setState() does not change the state immediately
        //https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
        this.setState({"numbers":numbers});
        console.log(this.state.numbers);

        e.preventDefault();
    }

    handleStartRangeChange(e) {
        this.setState({
            rangeStart: e.target.value
        });
    }

    handleEndRangeChange(e) {
        this.setState({
            rangeEnd: e.target.value
        });
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
     */
    getRandomArbitrary(min, max) {
        var minNum = parseInt(min);
        var maxNum = parseInt(max);
        return Math.random() * (minNum - maxNum) + minNum;
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
     */
    getRandomInt(min, max) {
        var minNum = parseInt(min);
        var maxNum = parseInt(max);
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    render() {
        return (
            <div>
                <h2> Generate lucky pick </h2>

                <Card>
                    <CardText>
                        <div>
                            Range start: {this.state.rangeStart}
                        </div>
                        <div>
                            Range End: {this.state.rangeEnd}
                        </div>

                        <NumberDisplay numbers={this.state.numbers}/>

                        <div className="luckyPickForm">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <div>
                                        <TextField
                                            hintText="Input the low range boundary"
                                            floatingLabelText="Starting of range"
                                            name="rangeStart"
                                            value={this.state.rangeStart}
                                            onChange={this.handleStartRangeChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            hintText="Input the high range boundary"
                                            floatingLabelText="End of range"
                                            name="rangeEnd"
                                            value={this.state.rangeEnd}
                                            onChange={this.handleEndRangeChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input type="submit"></input>
                                </div>
                            </form>
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default GenerateLuckyPick;
