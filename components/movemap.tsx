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
            {lat: 38.98550788177763, lon: -119.95125685761346, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/06964246B69F96F6E58168C85F55993D.mov" },
            {lat: 40.44742581256796, lon: -79.9519616032036, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0444.MOV" },
            {lat: 37.80611632218698, lon: -122.45141208680785, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0805.MOV" },
            {lat: 37.87363634528571, lon: -122.25992175210574, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0928.MOV" },
            {lat: 37.874142544174994, lon: -122.25833498573701, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0951.MOV" },
            {lat: 37.874305335027934, lon: -122.25860909069397, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0954.MOV" },
            {lat: 37.86952936622953, lon: -122.25980065294539, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_0978.MOV" },
            {lat: 37.487087515565236, lon: -122.22762752670506, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4050.MOV" },
            {lat: 33.10846213410639, lon: -117.31916932637, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4131.MOV" },
            {lat: 40.44733935471331, lon: -79.95306553545244, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4169.MOV" },
            {lat: 37.42900692971379, lon: -122.16695333547133, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4235.MOV" },
            {lat: 37.42904420402164, lon: -122.16695132381454, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4277.MOV" },
            {lat: 37.4289382384407, lon: -122.16698283977067, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4319.MOV" },
            {lat: 37.42773453447431, lon: -122.16667311689959, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4323.MOV" },
            {lat: 37.42779094698095, lon: -122.17662576467774, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4326.MOV" },
            {lat: 37.42941100765717, lon: -122.17334736973395, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4335.MOV" },
            {lat: 37.428042928683425, lon: -122.17398207631561, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4378.MOV" },
            {lat: 37.87116391295846, lon: -122.26190357457881, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4397.MOV" },
            {lat: 37.87473979062663, lon: -122.25893209554685, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4402.MOV" },
            {lat: 37.804157966932095, lon: -122.4771000216979, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4429.MOV" },
            {lat: 37.42897489347094, lon:-122.16696410727363, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4558.MOV" },
            {lat: 37.42836852000418, lon: -122.1760434621624, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4564.MOV" },
            {lat: 33.79001763202275, lon: -84.38534913680199, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4694.MOV" },
            {lat: 33.79035590243014, lon: -84.38552817425371, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4722.MOV" },
            {lat: 33.79206228754374, lon: -84.38617838363137, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4749.MOV" },
            {lat: 33.793748689967366, lon: -84.38691474167297, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4754.MOV" },
            {lat: 42.368311918364775, lon: -71.11825495216216, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4788.mov" },
            {lat: 40.719745414344445, lon: -73.98005929844348, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4863.MOV" },
            {lat: 40.72833622237858, lon: -73.99113396513975, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_4884.mov" },
            {lat: 37.77010988586029, lon: -122.42144125723435, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5174.MOV"},
            {lat: 38.94330492692008, lon: -119.93894302033958, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5188.MOV"},
            {lat: 37.73718068755446, lon: -122.37511417477538, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5233.MOV"},
            {lat: 37.77247720675589, lon: -122.42692383894145, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5250.MOV"},
            {lat: 40.71709436894075, lon: -73.98854208214819, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5286.MOV"},
            {lat: 40.718278593218606, lon:-74.0151338369464, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5327.MOV"},
            {lat: 40.7138577127681, lon: -74.01745992930633, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5332.MOV"},
            {lat: 40.728443753855515, lon: -73.99054614662708, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5354.MOV"},
            {lat: 32.70715486862607, lon: -117.15560164817369, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5475.MOV"},
            {lat: 32.73051784293896, lon: -117.25695071104515, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5483.MOV"},
            {lat: 37.74635622420799, lon: -122.38408397508401, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5615.MOV"},
            {lat: 37.72197311501385, lon: -122.47880756391307, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5914.MOV"},
            {lat: 37.72195667262937, lon: -122.47876196636035, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5928.MOV"},
            {lat: 37.77637118426276, lon: -122.4508715571302, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_5949.MOV"},
            {lat: 40.720009282386485, lon: -73.95153418358046, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6159.MOV"},
            {lat: 35.46446629553633, lon: -97.51335550869287, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6258.MOV"},
            {lat: 35.46490134528, lon: -97.51208519285164, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6234.MOV"},
            {lat: 40.71164619384324, lon: -73.9356207665202, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6310.MOV"},
            {lat: 40.44593830145676, lon: -79.95307074936333, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6446.MOV"},
            {lat: 40.44210139786489, lon: -79.9558489575145, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6451.MOV"},
            {lat: 37.80414792290567, lon: -122.4771027151661, videoUrl: "https://bstadt-bucket.s3.us-east-2.amazonaws.com/movemap/IMG_6655.MOV"},


        ];

        g.selectAll("circle")
            .data(videoPoints)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.lon, d.lat])[0])
            .attr("cy", d => projection([d.lon, d.lat])[1])
            .attr("r", 6)
            .attr("fill", "black")
            .on("mouseover", (event, d) => props.onMouseOver(d));

        // Zoom and Pan functionality
        const zoom = d3.zoom()
            .scaleExtent([0.1, 60000])
            .on('zoom', (event) => {
                console.log(event)
                g.attr('transform', event.transform);
                g.selectAll("circle")
                    .attr("r",6/(event.transform.k**(1)))
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

