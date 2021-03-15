import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      exponent: 0,
      generated: false,
      exponentArray: [],
      inputTextArea: ""
    };
  }
  changeExponent = (e) => {
    let value = e.target.value;
    value = value > 15 ? 15 : value < 0 ? 0 : value;
    this.setState({
      exponent: Number(value),
    });
  };

  changeTextArea = (e) => {
      let value = e.target.value;
      this.setState({
          inputTextArea: value
      })
      console.log(this.state.inputTextArea)
  }


  generate = (e) => {
    e.preventDefault();
    let input = this.state.inputTextArea
    input = input.charAt(0).toUpperCase() + input.slice(1)

    this.setState({
        inputTextArea: input
    })
    this.setState({
      exponentArray: Array.apply(null, { length: this.state.exponent }).map(
        Number.call,
        Number
      ),
      generated: this.state.exponent ? true : false,
    });
  };

  calculateValue = (row, column) =>
    this.factorial(row) /
    (this.factorial(column) * this.factorial(row - column));

  factorial = (number) =>
    number >= 0 ? (number !== 0 ? number * this.factorial(number - 1) : 1) : -1;

  render() {
    let lists = this.state.exponentArray.map((val, key) => {
      let row = this.state.exponentArray.slice(0, key + 1).map((val2, key2) => {
        return (
          <div>
            <h4 className="custom-display-inline-block text-white">
              {this.calculateValue(key, key2)}
            </h4>
          </div>
        );
      });
      return <div className="text-center big-list-container">{row}</div>;
    });
    return (
      <div className="home">
        Welcome, BUDI
        <div className="input">
          <label>Masukan Sebuah Kalimat: </label>
          <textarea
            style={{ marginLeft: "40px", width: "70%", height: "110px" }}
            value={this.state.inputTextArea}
            onChange={this.changeTextArea}
          />
        </div>
        <div className="input">
          <label>Masukan Banyak Segitiga: </label>
          <input
            type="number"
            style={{ marginLeft: "40px", width: "70%", height: "25px" }}
            value={this.state.exponent ? this.state.exponent : ""}
            onChange={this.changeExponent}
          />
        </div>
        <div
          style={{ textAlign: "center", marginTop: "30px", marginLeft: "30%" }}
        >
          <Button variant="contained" color="primary" onClick={this.generate}>
            Process
          </Button>
        </div>
        <div className="input">
          <label>Hasil: </label>
          <div style={{marginLeft: "185px", width:"70%", height:"50%", backgroundColor:"white"}} className="custom-flex custom-column-reverse">{lists}</div>
        </div>
      </div>
    );
  }
}

export default Home;
