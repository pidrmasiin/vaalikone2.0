import React from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import { Dimmer, Loader } from 'semantic-ui-react'

class SingleQuestionData extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      this.drawChart(this.props.data);
    }
  }
    
  drawChart() {
    
      let data = {
        name: "Eduskunta",
        color: "grey",
        children: [
        {
        name: "Jaa",
        color: "#003300",
        children: [
          {name: "SDP", color: "red", children: [
            {name: "jaa", value: 52 * (52/55), color: "green"}, 
            {name: "Ei", value: 0, color: "red"}, 
            {name: "EOS", value: 52 * (3/55), color: "grey"}
            ]}
          , 
          {name: "KOK", color: "blue", children: [
            {name: "jaa", value: 1 * (1/28), color: "green"}, 
            {name: "Ei", value: 1 * (25/28), color: "red"}, 
            {name: "EOS", value: 1 * (2/28), color: "grey"}
          ]},
        {name: "vihr", color: "lightgreen", children: [
          {name: "jaa", value: 10 * (10/22), color: "green"}, 
          {name: "Ei", value: 10 * (9/22), color: "red"}, 
          {name: "EOS", value: 10 * (3/22), color: "grey"}
        ]
      }
      ]},
        {
          name: "Ei",
          color: '#660033',
          children: [
            {name: "KOK", color: "blue", children: [
              {name: "jaa", value: 25 * (1/28), color: "green"}, 
              {name: "Ei", value: 25 * (25/28), color: "red"}, 
              {name: "EOS", value: 25 * (2/28), color: "grey"}
            ]},
            {name: "PERSUT", color: "darkblue", children: [
              {name: "jaa", value: 0, color: "green"}, 
              {name: "Ei", value: 12, color: "red"}, 
              {name: "EOS", value: 0, color: "grey"}
            ]
          },
          {name: "vihr", color: "lightgreen", children: [
            {name: "jaa", value: 9 * (10/22), color: "green"}, 
            {name: "Ei", value: 9 * (9/22), color: "red"}, 
            {name: "EOS", value: 9 * (3/22), color: "grey"}
          ]
        }
        ]}
        ,
        {
          name: "EOS",
          color: 'grey',
          children: [
            {name: "SDP", color: "red", children: [
              {name: "jaa", value: 3 * (52/55), color: "green"}, 
              {name: "Ei", value: 0, color: "red"}, 
              {name: "EOS", value: 3 * (3/55), color: "grey"}
              ]}
            , 
            {name: "KOK", color: "blue", children: [
              {name: "jaa", value: 2 * (1/28), color: "green"}, 
              {name: "Ei", value: 2 * (25/28), color: "red"}, 
              {name: "EOS", value: 2 * (2/28), color: "grey"}
            ]},
          {name: "vihr", color: "lightgreen", children: [
            {name: "jaa", value: 3 * (10/22), color: "green"}, 
            {name: "Ei", value: 3 * (9/22), color: "red"}, 
            {name: "EOS", value: 3 * (3/22), color: "grey"}
          ]
        }
        ]}
        ]}

      
      let format = d3.format(",d")
      let width = 932
      let radius = width / 6
      let arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 1, 0.01))
      .padRadius(radius * 9)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
      
      const root = this.partition(data);

      root.each(d => d.current = d);
    
      const svg = d3.select('#' + this.props.id)
          .attr("viewBox", [0, 0, width, width])
          .style("font", "14px sans-serif")
    
      const g = svg.append("g")
          .attr("transform", `translate(${width / 2},${width / 2})`);
    
      const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
          .attr("fill", function(d) { return d.current.data.color; })
          .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr("d", d => arc(d.current));
    
      path.filter(d => d.children)
          .style("cursor", "pointer")
          .on("click", clicked);
    
      path.append("title")
          .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    
      const label = g.append("g")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", d => +labelVisible(d.current))
          .attr("transform", d => labelTransform(d.current))
          .text(d => d.data.name);
    
      const parent = g.append("circle")
          .datum(root)
          .attr("r", radius)
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("click", clicked);
    
      function clicked(p) {
        parent.datum(p.parent || root);
    
        root.each(d => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });
    
        const t = g.transition().duration(750);
    
        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {
              const i = d3.interpolate(d.current, d.target);
              return t => d.current = i(t);
            })
          .filter(function(d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween("d", d => () => arc(d.current));
    
        label.filter(function(d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          }).transition(t)
            .attr("fill-opacity", d => +labelVisible(d.target))
            .attrTween("transform", d => () => labelTransform(d.current));
      }
      
      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }
    
      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }
    
      function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
    
      return svg.node();
  }

  partition = data => {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
      (root);
  }
        
  render(){
    return <svg id={this.props.id}
    style={{height: '25em'}}
    />
  }
}

const mapStateToProps = state => ({
  questions: state.kysymykset
});

export default connect(
  mapStateToProps,
  null
)(SingleQuestionData)