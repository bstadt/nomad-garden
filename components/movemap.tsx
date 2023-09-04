'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Scatter = (props) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(mapRef.current)
            .append("svg")
            .attr("width", 600)
            .attr("height", 600);

        const projection = d3.geoAlbersUsa()
            .scale(800)
            .translate([480, 300]);

        const path = d3.geoPath().projection(projection);

        const g = svg.append("g");

        const videoPoints = [
            {lat: 37.874305, lon: -122.258603, videoUrl: "/davis_hall.mov" },
            {lat: 40.44247653131868, lon: -79.9571523945145, videoUrl:"/pitt_kp.mov"}
        ];

        g.selectAll("circle")
            .data(videoPoints)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.lon, d.lat])[0])
            .attr("cy", d => projection([d.lon, d.lat])[1])
            .attr("r", 8)
            .attr("fill", "black")
            .on("mouseover", (event, d) => props.onMouseOver(d));

        // Zoom and Pan functionality
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);
        svg.call(zoom.transform, d3.zoomIdentity.scale(0.8));
    }, []);

    return <div ref={mapRef}></div>;
}

export default function MoveMap() {

    const [currentVideo, setCurrentVideo] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const handleMouseOver = (data) => {
        setCurrentVideo(data.videoUrl);
        //setCurrentDescription(description);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-wrap md:flex-row flex-col justify-between w-full">
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center h-screen">
                    <div className="flex justify-center items-center">
                        {currentVideo ? (
                            <div className="flex flex-col items-center">
                                <video src={currentVideo} width="100%" height="auto" autoPlay muted loop>
                                </video>
                                <p className="text-center w-full whitespace-normal mx-auto mt-4">
                                    <em>{currentDescription}</em>
                                </p>

                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <p className="text-center w-full whitespace-normal mx-auto mt-4">
                                    <em>{currentDescription}</em>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center h-screen">

                    <Scatter onMouseOver={handleMouseOver}/>
                </div>
            </div>
        </div>
    );
}

