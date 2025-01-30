import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3LinearGraph = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Clear previous content

        const margin = { top: 20, right: 30, bottom: 50, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(data.map(d => d.x))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .nice()
            .range([height, 0]);

        const xAxis = (g) =>
            g.attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");

        const yAxis = (g) =>
            g.call(d3.axisLeft(y))
                .call((g) => g.select(".domain").remove());

        const line = d3.line()
            .defined((d) => !isNaN(d.y))
            .x((d) => x(d.x) + x.bandwidth() / 2)
            .y((d) => y(d.y));

        const svgContent = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svgContent.append("g")
            .call(xAxis);

        svgContent.append("g")
            .call(yAxis);

        svgContent.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

    }, [data]);

    return <svg ref={ref} width="800" height="400"></svg>;
};

export default D3LinearGraph;
