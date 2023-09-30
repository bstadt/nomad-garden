import React, { useEffect, useRef } from "react";

const RandomWalkCanvas = () => {
    const canvasRef = useRef(null);
    const walkSteps = useRef([]);
    const precomputeWalk = (steps) => {
        const walk = [{x: 0, y: 0}];
        let totalX = 0;
        let totalY = 0;
        let delta = 4;

        for (let i = 0; i < steps; i++) {
            const { x, y } = walk[i];
            const randomDirection = Math.floor(Math.random() * 4);
            switch (randomDirection) {
                case 0: // Up
                    walk.push({ x, y: y - delta });
                    break;
                case 1: // Right
                    walk.push({ x: x + delta, y });
                    break;
                case 2: // Down
                    walk.push({ x, y: y + delta });
                    break;
                case 3: // Left
                    walk.push({ x: x - delta, y });
                    break;
                default:
                    break;
            }
            totalX += walk[i+1].x;
            totalY += walk[i+1].y;
        }

        const centerX = totalX / steps;
        const centerY = totalY / steps;

        return { walk, centerX, centerY };
    };

    const drawWalk = (ctx, offsetX, offsetY, stepCount = 0) => {
        const middleIndex = Math.floor(walkSteps.current.length / 2);

        // Determine the forward and backward steps
        const forwardPoint = walkSteps.current[middleIndex + stepCount];
        const backwardPoint = walkSteps.current[middleIndex - stepCount];

        var prevForwardPoint;
        var prevBackwardPoint;
        if(stepCount > 0){
            prevForwardPoint = walkSteps.current[middleIndex + stepCount - 1];
            prevBackwardPoint = walkSteps.current[middleIndex - stepCount + 1];
        } else {
            prevForwardPoint = walkSteps.current[middleIndex];
            prevBackwardPoint = walkSteps.current[middleIndex];
        }


        // If either point exists, draw its respective line
        if (forwardPoint) {
            ctx.beginPath();
            ctx.moveTo(prevForwardPoint.x + offsetX, prevForwardPoint.y + offsetY);
            ctx.lineTo(forwardPoint.x + offsetX, forwardPoint.y + offsetY);
            ctx.stroke();
        }

        if (backwardPoint) {
            ctx.beginPath();
            ctx.moveTo(prevBackwardPoint.x + offsetX, prevBackwardPoint.y + offsetY);
            ctx.lineTo(backwardPoint.x + offsetX, backwardPoint.y + offsetY);
            ctx.stroke();
        }

        // If neither line has reached its respective endpoint, recurse
        if (middleIndex - stepCount > 0 || middleIndex + stepCount < walkSteps.current.length - 1) {
            setTimeout(() => drawWalk(ctx, offsetX, offsetY, stepCount + 1), 1);
        }
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        const { walk, centerX, centerY } = precomputeWalk(3072);

        walkSteps.current = walk;

        const renderOffsetX = width / 2 - centerX;
        const renderOffsetY = height / 2 - centerY;

        drawWalk(ctx, renderOffsetX, renderOffsetY);
    }, []);

    return <canvas ref={canvasRef} width={450} height={450} style={{border: '2px solid black'}}/>;
};

export default RandomWalkCanvas;
