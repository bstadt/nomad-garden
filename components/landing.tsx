'use client'
import { useState } from "react";
import Link from "next/link";
import RandomWalkCanvas from "@/components/random-walk";

export default function Landing({ slugs, metas }) {
    const [currentThumbnail, setCurrentThumbnail] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const handleMouseOver = (thumbnail, description) => {
        setCurrentThumbnail(thumbnail);
        setCurrentDescription(description);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-wrap md:flex-row flex-col justify-between w-full">
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center h-screen">
                    <div className="flex justify-center items-center">
                        {currentThumbnail ? (
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
                                <RandomWalkCanvas/>
                                <p className="text-center w-full whitespace-normal mx-auto mt-4">
                                    <em>{currentDescription}</em>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center h-screen">
                    <div>
                        <div className="text-center pb-16">
                            <p>Hi, I'm Brandon. This is my corner of the internet.</p>
                            <p>I spend most of my time working as the founder and CEO of <a href={'https://home.nomic.ai/'} className={'cursor-pointer hover:underline'}>Nomic</a>.</p>
                            <p>I spend the rest of my time doing things without considering their utility.</p>
                            <p>I've written about some of these things here.</p>
                        </div>
                        <div className=''>
                            <ul className="text-center overflow-y-scroll">
                                {slugs.map((slug, index) => (
                                    <li
                                        key={slug}
                                        onMouseOver={() => handleMouseOver(metas[index].thumbnail, metas[index].description)}
                                        className="cursor-pointer hover:underline mb-2"
                                    >
                                        <Link href={`/posts/${slug}`}>
                                            <p className="block">{metas[index].title}</p>
                                        </Link>
                                    </li>
                                ))
                                .filter((slug, index) => {return metas[index].hidden === undefined || !metas[index].hidden})
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
