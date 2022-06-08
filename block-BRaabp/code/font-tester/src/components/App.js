import React from "react";

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      font: 23,
      value: ""

    }
  }

  render() {
    const fonts = ['American Typewriter', 'Andale Mono','Arial','Arial Black','Arial Narrow','Arial Rounded MT Bold',
      'Arial Unicode MS','Avenir','Avenir Next','Avenir Next Condensed','Baskerville','Big Caslon','Bodoni 72',
      'Bodoni 72 Oldstyle','Bodoni 72 Smallcaps','Bradley Hand','Brush Script MT','Chalkboard','Chalkboard SE',
      'Chalkduster','Charter','Cochin','Comic Sans MS','Copperplate','Courier','Courier New','Didot','DIN Alternate',
      'DIN Condensed','Futura','Geneva','Georgia','Gill Sans','Helvetica','Helvetica Neue','Herculanum','Hoefler Text',
      'Impact','Lucida Grande','Luminari','Marker Felt','Menlo','Microsoft Sans Serif','Monaco','Noteworthy','Optima',
      'Palatino','Papyrus','Phosphate','Rockwell','Savoye LET','SignPainter','Skia','Snell Roundhand','Tahoma','Times',
      'Times New Roman','Trattatello','Trebuchet MS','Verdana'];
    return (
      <div className="m-5 container:xl">
        <div className="flex justify-between content-center p-4 rounded-3xl border">
          <div>
            <form />
            <label htmlFor="fname">custom</label>
            <input className="outline-0 ml-4 w-96" onChange={(e) => { this.setState({ value: e.target.value }) }} type="text" id="fname" name="fname" />
          </div>
          <div>
            <label>{this.state.font}px</label>
            <input className="mr-4 ml-5 w-96 h-1" onChange={(e) => { this.setState({ font: Number(e.target.value) }) }} type="range" name="font"
              min="1" max="100" />
            {console.log(this.state)}
          </div>
        </div>
        <div className="mt-20">
          <div className="flex justify-between m-auto">
            <h3>{fonts.length} of {fonts.length} famlies</h3>
            <div className="flex ml-4">
              <p>Sort by: Trending</p>
            </div>
          </div>
        </div>
        <div className="flex w-screen flex-wrap justify-evenly">
          {fonts.map((ele, i) => <div className="w-96 h-72 m-7 mt-4 border p-5 overflow-y-scroll rounded-md">
            <div className="flex justify-between" >
              <h4 className="font-bold">{ele}</h4>
              <p className="font-light">1 style</p>
            </div>
            <div className="p-5">
              <h2 style={{ fontFamily: ele, fontSize: this.state.font }}>{this.state.value}</h2>
            </div>
          </div>)}
        </div>
      </div>
    );
  }
}

export default App;
