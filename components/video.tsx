import React from "react";

export default function RemoteVideo(props){
    return(
    <div className="flex flex-col items-center">
        <video src={props.src} width="100%" height="auto" autoPlay muted loop playsInline>
        </video>
    </div>)
}