import React from 'react';

import database from './firebase';

class Graphics extends React.Component {
  state = {
    values: [],
  };

  componentWillMount() {
    let incomingValues = database.ref(this.props.sensor);

    incomingValues.on('value', snapshot => {
      let incomingValue = snapshot.val();

      this.setState({ 
        values: this.state.values.concat(incomingValue),
        value: incomingValue
      });
    });
  }

  //getIncomingValue = () => {
  //  return this.state.value;
  //};

  render() {
    return (
      <div>
        <h3>{ this.props.label }</h3>

        <span>This is the current value: { this.state.value }</span>
        <ul>
          {
            this.state.values.map((value, i) => <li key={ i }>{ value }</li>).reverse()
          }
        </ul>
      </div>
    );
  }
}

export default Graphics;
