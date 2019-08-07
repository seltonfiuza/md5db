import React, { Component } from 'react';
import axios from 'axios';
import wow from './wow.jpg';

class Fib extends Component {
  key;
  state = {
    numKeys: null,
    keyEncrypted: null
  };

  async fetchNumKeys() {
    const numKeys = await axios.get('/api/');
    this.setState({numKeys: numKeys.data.numKeys})
  }

  async fetchKeys() {
    const values = await axios.post('/api/keys', {key: this.key});
    this.setState({ keyEncrypted: values.data.keyencrypted});
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/keys', {
      key: this.key
    });
    this.fetchKeys();
    this.fetchNumKeys();
    this.key = null;
  };

  reKey(key){
    this.key=key
  }

  componentDidMount() {
    this.fetchNumKeys();
  }

  render() {
    return (
      <div>
        <h3>Numero de entradas no banco de dados: {this.state.numKeys}</h3>
        <label>Entre com a chave: </label>
        <input
          value={this.key}
          onChange={event => this.reKey(event.target.value)}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <h2>{this.state.keyEncrypted? 'Chave Encriptada: ' + this.state.keyEncrypted : null}</h2>
        <hr></hr>
        <img src={wow} className="App-wow" alt="logo" />
      </div>
    );
  }
}

export default Fib;
