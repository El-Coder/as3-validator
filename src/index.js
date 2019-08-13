import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from 'axios'


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
    handleSubmit = event =>  {
      event.preventDefault();

      var payload = {
        
          "class": "AS3",
          "action": "deploy",
          "persist": true,
          "declaration": {
             "class": "ADC",
             "schemaVersion": "3.0.0",
             "id": "urn:uuid:33045210-3ab8-4636-9b2a-c98d22ab915d",
             "label": "Sample 1",
             "remark": "Simple HTTP application with RR pool",
             "Sample_01": {
                "class": "Tenant",
                "A1": {
                   "class": "Application",
                   "template": "http",
                   "serviceMain": {
                      "class": "Service_HTTP",
                      "virtualAddresses": [
                         "10.0.1.10"
                      ],
                      "pool": "web_pool"
                   },
                   "web_pool": {
                      "class": "Pool",
                      "monitors": [
                         "http"
                      ],
                      "members": [{
                         "servicePort": 80,
                         "serverAddresses": [
                            "192.0.1.10",
                            "192.0.1.11"
                         ]
                      }]
                   }
                }
             }
          }
       
      };

      //payload = JSON.stringify(payload);

      axios.post(`http://localhost:4000/eliezersbaby/verify`, payload)
        .then(res => {
          //console.log(res);
          console.log(res.data);
        })
        console.log(payload)
    }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>AS3 Validator</h1>
          <p>
            Your Declaration is:
            {//this.state.errormessage
            }
          </p>
          <textarea className="textboxclass" name="name" value={this.state.value} onChange={this.myChangeHandler} cols='50' rows='10'  />
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
