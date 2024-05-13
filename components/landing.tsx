'use client'
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DownTriangle from "@/components/down-triangle";

export default function Landing({ slugs, metas }) {
    const [currentThumbnail, setCurrentThumbnail] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const handleMouseOver = (thumbnail, description) => {
        setCurrentThumbnail(thumbnail);
        setCurrentDescription(description);
    };

    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const listRef = useRef(null);
    const handleListScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        const atBottom = scrollTop + clientHeight === scrollHeight;
        setIsScrolledToBottom(atBottom);
    };

    const scrollListDown = () => {
        const { clientHeight } = listRef.current;
        listRef.current.scrollBy({ top: clientHeight, behavior: 'smooth' });
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
        <div className="flex flex-col h-screen text-lg text-base">
            <div className="w-full mt-[10vh]">
                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 h-[calc(screen-mt-[10vh])]">
                    <div className="hidden md:block md:col-span-1"></div>

                    <div className="col-span-1 md:col-span-4 p-4 flex justify-center">
                        {currentDescription.length == 0 ? (
                            <div className="flex flex-col items-center">
                                <div className="w-full relative">
                                    <img src={'/w_refik.webp'} className="max-h-[34rem] border-2 border-black"/>
                                    <div className="absolute overflow-hidden flex justify-center items-center left-1/2 transform -translate-x-1/2 w-full">
                                        <div className="text-center">
                                            <p className="whitespace-normal pt-4">
                                                <em className="overflow-y-auto max-h-40">Getting my latent space poster signed by <a href={'https://refikanadol.com/'} className={'cursor-pointer underline'}>Refik Anadol</a></em>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-full relative">
                                    <img src={'/w_refik.webp'} className="max-h-[34rem] border-2 border-black"/>
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

                    <div className="min-h-[6vh] md:min-h-0 col-span-1"></div>

                    <div className="col-span-1 md:col-span-4 p-4 flex justify-center">
                        <div>
                            <div className="text-justify pb-8">
                                <p>Hi, I'm <a href={'/posts/bio'} className={'cursor-pointer underline'}>Brandon</a>. This is my corner of the internet.
                                I spend most of my time working as the cofounder and CEO of <a href={'https://nomic.ai/'} className={'cursor-pointer underline'}>Nomic</a>.
                                I spend the rest of my time doing things without considering their <a href={'https://en.wikipedia.org/wiki/Utility_monster'} className={'cursor-pointer underline'}>utility</a>.
                                I've written about some of these things here:</p>
                            </div>
                            <div className=''>
                                <ul className="text-center overflow-y-scroll mb-2 md:max-h-[calc(2.5rem*10)]" ref={listRef} onScroll={handleListScroll} >
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
                                <div className="hidden md:block w-8 h-6 relative left-1/2 bottom-0 pb-10 transform -translate-x-1/2 hover:cursor-pointer" >
                                {!isScrolledToBottom &&
                                   <div onClick={scrollListDown}>
                                    <DownTriangle/>
                                   </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block md:col-span-1"></div>
                </div>
            </div>
        </div>
    );
}
