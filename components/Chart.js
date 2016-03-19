import React from 'react'
import c3 from 'c3'

require('./../node_modules/c3/c3.css')

class Chart extends React.Component {

  componentDidMount() {
    let el = this.refs.chart;
    let c3Config = _.extend(this.props.config, {
      bindto: el  
    })
    this.chart = c3.generate(c3Config);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("props", nextProps)
    //this.chart.load(nextProps.data);
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default Chart