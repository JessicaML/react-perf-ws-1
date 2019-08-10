import React, { PureComponent } from 'react'
import Task from './4sCUROW'
import rows from './lib/animals.json'
import { whyDidYouUpdate } from "why-did-you-update";
whyDidYouUpdate(React);

class App extends PureComponent {
  state = {
    toggle: true
  }

  handleToggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  }  
  
  render() {
    const columns = [
      { key: 'name', name: 'Name' },
      { key: 'fact1', name: 'Fact 1' },
      { key: 'fact2', name: 'Fact 2' },
      { key: 'fact3', name: 'Fact 3' },
      { key: 'image', name: 'Image', structure: 'image'},

    ]


    

    return (
      <main className={this.state.toggle ? 'night' : 'day'}>
        <button type="button" onClick={this.handleToggle} >
          {this.state.toggle ? 'light theme' : 'dark theme'}
        </button>
        <Task columns={columns} rows={rows} />
      </main>
    );
  }
}

export default App
