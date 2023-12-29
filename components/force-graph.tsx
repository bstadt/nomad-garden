'use client'

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceGraph= (props) => {
    const svgRef = useRef();
    const nodes = props['nodes'];
    const links = props['edges'];

    useEffect(() => {
        // Set up the D3 force-directed layout
        const width = 600;
        const height = 400;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line');

        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .call(d3.drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded));

        node.append('title')
            .text(d => d.id);

        simulation.nodes(nodes)
            .on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
            });

        simulation.force('link')
            .links(links);

        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default ForceGraph;