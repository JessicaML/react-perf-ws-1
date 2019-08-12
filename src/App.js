// import React, { PureComponent } from 'react'
import React, { useState } from 'react';

import Task from './ALLMEMO'
import rows from './lib/animals.json'
// import { whyDidYouUpdate } from "why-did-you-update";
// whyDidYouUpdate(React);

// class App extends PureComponent {
//   state = {
//     toggle: true
//   }
//   handleToggle = () => {
//     this.setState(prevState => ({
//       toggle: !prevState.toggle,
//     }));
//   }  
//   render() {
    const columns = [
      { key: 'name', name: 'Name' },
      { key: 'fact1', name: 'Fact 1' },
      { key: 'fact2', name: 'Fact 2' },
      { key: 'fact3', name: 'Fact 3' },
      { key: 'image', name: 'Image', structure: 'image'},

    ]
//     return (
//       <main className={this.state.toggle ? 'night' : 'day'}>
//         <button type="button" onClick={this.handleToggle} >
//           {this.state.toggle ? 'light theme' : 'dark theme'}
//         </button>
//         <Task columns={columns} rows={rows} />
//       </main>
//     );
//   }
// }

// const MemoApp = React.memo(() => {
  const App = function() {
    // Declare a new state variable, which we'll call "count"
    const [toggle, setToggle] = useState(true);
  
    return (
  
  
      <main className={toggle ? 'night' : 'day'}>
      <button type="button" onClick={() => setToggle(!toggle)} >
        {toggle ? 'light theme' : 'dark theme'}
      </button>
      <Task columns={columns} rows={rows} />
    </main>
  
    );
  }
// });





export default App
