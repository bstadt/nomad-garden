'use client'
import { useState } from "react";
import Link from "next/link";
import BrownianBridgeCanvas from "@/components/brownian-bridge";

export default function Landing({ slugs, metas }) {
    const [currentThumbnail, setCurrentThumbnail] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const handleMouseOver = (thumbnail, description) => {
        setCurrentThumbnail(thumbnail);
        setCurrentDescription(description);
    };

    const indices = [...Array(metas.length).keys()];
    const sortedIndices = indices.sort((a, b) => {
        const priorityA = metas[a].priority;
        const priorityB = metas[b].priority;

        // If both are undefined, maintain their original order
        if (priorityA === undefined && priorityB === undefined) return a - b;

        // If priorityA is undefined but priorityB is defined, place a after b
        if (priorityA === undefined) return 1;

        // If priorityB is undefined but priorityA is defined, place a before b
        if (priorityB === undefined) return -1;

        // If both are defined, compare their values
        return priorityA - priorityB;
    });


    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-wrap md:flex-row flex-col justify-between w-full mt-[15vh]">
                <div className="w-full md:w-1/2 p-4 flex justify-center h-screen">
                    <div className="flex justify-center">
                        {false? (
                            <div className="flex flex-col items-center">
                                <img
                                    className="max-w-sm max-h-96 object-cover"
                                    src={currentThumbnail}
                                    alt="Current Post Thumbnail"
                                />
                                <p className="text-center w-full whitespace-normal mx-auto mt-4">
                                    <em>{currentDescription}</em>
                                </p>

                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-full relative">
                                    <img src={'/bstadt.jpg'} className="max-h-[32rem] border-2 border-black"/>
                                    <div className="absolute overflow-hidden flex justify-center items-center left-1/2 transform -translate-x-1/2 w-full">
                                        <div className="text-center">
                                            <p className="whitespace-normal pt-4">
                                                <em className="overflow-y-auto max-h-40">{currentDescription}</em>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 flex justify-center h-screen">
                    <div>
                        <div className="text-center pb-8">
                            <p>Hi, I'm <a href={'/posts/bio'} className={'cursor-pointer underline'}>Brandon</a>. This is my corner of the internet.</p>
                            <p>I spend most of my time working as the founder and CEO of <a href={'https://nomic.ai/'} className={'cursor-pointer underline'}>Nomic</a>.</p>
                            <p>I spend the rest of my time doing things without considering their utility.</p>
                            <p>I've written about some of these things here:</p>
                        </div>
                        <div className=''>
                            <ul className="text-center overflow-y-scroll">
                                {sortedIndices.map((index) => (
                                    <li
                                        key={slugs[index]}
                                        onMouseOver={() => handleMouseOver(metas[index].thumbnail, metas[index].description)}
                                        className="cursor-pointer hover:underline mb-2"
                                    >
                                        <Link href={`/posts/${slugs[index]}`}>
                                            <p className="block">{metas[index].title}</p>
                                        </Link>
                                    </li>
                                ))
                                .filter((slug, index) => {return metas[sortedIndices[index]].hidden === undefined || !metas[sortedIndices[index]].hidden})
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
