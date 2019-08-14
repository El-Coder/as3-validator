import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from 'axios'

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
    errormessage:''
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  myChangeHandler = event => {
      this.setState({ value: event.target.value});
      
      
  };
  handleSubmit(event) {
    var payload = JSON.parse(this.state.value);
    event.preventDefault();

    axios.post(`http://localhost:4000/eliezersbaby/verify`, payload) 
      .then(res => {
          this.setState({errormessage: res.data});

      })
  }

     
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>AS3 Validator</h1>
          <p>
            Your Declaration is {this.state.errormessage}
          </p>
          <textarea className="textboxclass" value={this.state.value} onChange={this.myChangeHandler} cols='50' rows='10'  />
          <input
            type="submit" value="Submit">
            </input>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MyForm />, rootElement);
