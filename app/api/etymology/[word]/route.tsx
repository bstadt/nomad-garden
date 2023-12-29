import {NextResponse} from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { word: string } }
) {
    const word = params.word;
    return fetch('https://en.wiktionary.org/wiki/'+word,
    )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            return NextResponse.json({'text': data});
        });
}