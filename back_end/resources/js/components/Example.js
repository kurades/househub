import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from './home';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        
                        <button onClick={() => {
                            axios({
                                method: 'get',
                                url: `https://rentapartment.herokuapp.com/api/rentItems`,
                                headers: {'Content-Type': 'application/json'},
                              }).then(response => {
                                console.log(response.data)
                              }).catch(error => {
                                console.log("error")
                              });
                        }}>ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
