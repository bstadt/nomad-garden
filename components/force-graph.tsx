'use client'
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ForceGraph = (props) => {
    const svgRef = useRef();
    const nodes = props['nodes'];
    const links = props['edges'];

    const [selectedNode, setSelectedNode] = useState(null);
    const [content, setContent] = useState('<div></div>');

    const handleNodeClick = (event) => {
        const word = event.target.__data__.id;
        fetch('/api/etymology/'+word)
            .then(response => response.json())
            .then(responseJson => setContent(responseJson['html']));
        setSelectedNode(event.target.__data__.id);
    };

    useEffect(() => {

        // Set up the D3 force-directed layout
        const width = 600;
        const height = 400;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-10000))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style('stroke', '#006895')
            .style('strokeWidth', 6);

        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('g')
            .call(d3.drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded))
            .on('click', d => handleNodeClick(d));

        node.append('title')
            .text(d => d.id);

        // Create rectangular nodes with text labels
        const rectWidth = 80;
        const rectHeight = 40;

        node.append('rect')
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('rx', 10) // Rounded corners
            .attr('ry', 10)
            .style('fill', '#fdf6e8')
            .style('stroke', '#006895')
            .style('strokeWidth', 6)

        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em') // Center text vertically
            .attr('x', rectWidth / 2)
            .attr('y', rectHeight/ 2)
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

                node.attr('transform', d => `translate(${d.x - rectWidth / 2},${d.y - rectHeight / 2})`);
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
        <div>
            <svg ref={svgRef}></svg>
            <div
                dangerouslySetInnerHTML={{__html: content}}
            />
        </div>
    );
};

export default ForceGraph;