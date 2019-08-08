import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage: ""
    };
  }
  myChangeHandler = event => {
    if (event.target.value) {
      this.setState({ errormessage: " Not Valid" });
    }
  };

  render() {
    return (
      <div>
        <form>
          <h1>AS3 Validator</h1>
          <p>
            Your Declaration is:
            {this.state.errormessage}
          </p>
          <input
            className="textboxclass"
            type="text"
            onChange={this.myChangeHandler}
          />
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MyForm />, rootElement);
