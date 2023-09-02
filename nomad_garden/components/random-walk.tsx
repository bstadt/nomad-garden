import React, { useEffect, useRef } from "react";

const RandomWalkCanvas = () => {
    const canvasRef = useRef(null);

    const draw = (ctx, x1, y1, x2, y2, stepCount) => {
        // Check if 500 steps have been taken, then return to stop the drawing
        if (stepCount >= 1024) return;

        const randomDirection = Math.floor(Math.random() * 4);

        ctx.beginPath();
        ctx.moveTo(x1, y1);

        switch (randomDirection) {
            case 0: // Up
                y1 -= 5;
                break;
            case 1: // Right
                x1 += 5;
                break;
            case 2: // Down
                y1 += 5;
                break;
            case 3: // Left
                x1 -= 5;
                break;
            default:
                break;
        }

        ctx.lineTo(x1, y1);
        ctx.stroke();

        const randomDirection2 = Math.floor(Math.random() * 4);

        ctx.beginPath();
        ctx.moveTo(x2, y2);

        switch (randomDirection2) {
            case 0: // Up
                y2 -= 5;
                break;
            case 1: // Right
                x2 += 5;
                break;
            case 2: // Down
                y2 += 5;
                break;
            case 3: // Left
                x2 -= 5;
                break;
            default:
                break;
        }

        ctx.lineTo(x2, y2);
        ctx.stroke();

        setTimeout(() => draw(ctx, x1, y1, x2, y2, stepCount + 1), 1);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        draw(ctx, centerX, centerY, centerX, centerY, 0);  // Initialize stepCount to 0
    }, []);

    return <canvas ref={canvasRef} width={450} height={450} style={{border: '2px solid black'}}/>;
};

export default RandomWalkCanvas;