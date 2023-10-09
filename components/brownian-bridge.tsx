import React, { useEffect, useRef } from "react";
import {render} from "react-dom";


function randomGaussian(variance = 1) {
    let u1, u2;
    do {
        u1 = Math.random();
        u2 = Math.random();
    } while (u1 <= Number.EPSILON);

    const stdDev = Math.sqrt(variance);
    let z0 = stdDev * Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0;
}
function generateBrownianMotion(steps, variance) {
    const motion = [0];
    for (let i = 1; i <= steps; i++) {
        motion.push(motion[i - 1] + randomGaussian(variance));
    }
    return motion;
}

const BrownianBridgeCanvas = () => {
    const canvasRef = useRef(null);
    const walkSteps = useRef(null);
    const precomputeWalks = (startPoint, endPoint, steps) => {

        function generateBrownianBridge(start, end, steps, variance) {
            const path = [];
            const T = steps;
            const W = generateBrownianMotion(T, variance);
            for (let t = 0; t <= T; t++) {
                const Bt = start.x * (T - t) / T + end.x * t / T + (W[t] - t / T * W[T]);
                path.push({y: start.y + (end.y - start.y) * t / T, x: Bt});
            }
            return path;
        }

        const redBridge = generateBrownianBridge(startPoint, endPoint, steps, 8);
        const blueBridge = generateBrownianBridge(startPoint, endPoint, steps, 10);
        const yellowBridge = generateBrownianBridge(startPoint, endPoint, steps, 12);
        const walks = {red: redBridge, blue: blueBridge, yellow: yellowBridge};

        return walks;
    }
    const drawWalks = (ctx, startPoint, endPoint, stepCount = 0) => {

        const redPoint = walkSteps.current.red[stepCount];
        const bluePoint = walkSteps.current.blue[stepCount];
        const yellowPoint = walkSteps.current.yellow[stepCount];

        var prevRedPoint;
        var prevBluePoint;
        var prevYellowPoint;
        if(stepCount>0){
            prevRedPoint = walkSteps.current.red[stepCount-1];
            prevBluePoint = walkSteps.current.blue[stepCount-1];
            prevYellowPoint = walkSteps.current.yellow[stepCount-1];
        }
        else{
            prevRedPoint = startPoint;
            prevBluePoint = startPoint;
            prevYellowPoint = startPoint;
        }

        ctx.lineWidth = 16;
        ctx.globalAlpha = 0.5;


        ctx.beginPath();
        ctx.strokeStyle = '#f62516';
        ctx.moveTo(prevRedPoint.x, prevRedPoint.y);
        ctx.lineTo(redPoint.x , redPoint.y);
        ctx.stroke();
        ctx.moveTo(450-prevRedPoint.x, prevRedPoint.y);
        ctx.lineTo(450-redPoint.x , redPoint.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#006895';
        ctx.moveTo(prevBluePoint.x , prevBluePoint.y);
        ctx.lineTo(bluePoint.x, bluePoint.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(450-prevBluePoint.x , prevBluePoint.y);
        ctx.lineTo(450-bluePoint.x, bluePoint.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#ffba00';
        ctx.moveTo(prevYellowPoint.x, prevYellowPoint.y);
        ctx.lineTo(yellowPoint.x, yellowPoint.y);
        ctx.stroke();
        ctx.moveTo(450-prevYellowPoint.x, prevYellowPoint.y);
        ctx.lineTo(450-yellowPoint.x, yellowPoint.y);
        ctx.stroke();

        if(stepCount < walkSteps.current.red.length - 1) {
            setTimeout(() => drawWalks(ctx, startPoint, endPoint, stepCount + 1), 1);
        }

    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        const startPoint = { x: 225, y: 50};
        const endPoint = { x: 225, y: 400};
        var walks = precomputeWalks(startPoint, endPoint, 2048);
        walkSteps.current = walks;
        drawWalks(ctx, startPoint, endPoint);
    }, []);

    return <canvas ref={canvasRef} width={450} height={450} style={{border: '2px solid black'}}/>;
};

export default BrownianBridgeCanvas;
