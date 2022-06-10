import React from "react";
import Main from "./Main";
import movies from "../data/movies";

class  App extends React.Component  {
  constructor ( props ) {
    super()
  }
  render(){
    return (
      <div className="App bg-blue-900 flex">
        <Main movies={movies} />
      </div>
    );
  }
}

export default App;
