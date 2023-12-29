import * as cheerio from 'cheerio';
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
            const parser = cheerio.load(data);


            //extract the first section of the page
            const firstH2 = parser('h2').eq(1);
            const secondH2= parser('h2').eq(2);
            const between = firstH2.nextUntil(secondH2);
            between.find('img').remove();
            between.find('figcaption').remove();
            between.find('cite').remove();
            between.find('span[class*="mw-editsection"]').remove();
            between.find('span[class*="synonym"]').remove();
            between.find('span[class*="antonym"]').remove();
            between.find('span[class*="maintenance-line"]').remove();
            between.find('div[class*="usage-example"]').remove();
            between.find('div[class*="NavHead"]').remove();
            between.find('div[class*="NavContent"]').remove();
            between.find('div[class*="citation-whole"]').each( (index, element) => {
                const citationDiv = parser(element);
                const closestList = citationDiv.closest('ul, ol');
                if (closestList.length > 0) {
                    closestList.remove();
                }
            });
            let htmlContent = '';
            var isGoodSection = false;
            between.each((index, element) => {
                if(element.name === 'h3' || element.name === 'h4' || element.name === 'h5'){
                    const curHTML = parser(element).html();
                    console.log(curHTML);
                    isGoodSection = false;
                    ['Etymology', 'Noun', 'Verb', 'Adjective', 'Adverb', 'Root'].forEach(e => {
                        if(curHTML.includes(e)) { isGoodSection = true }
                    })
                }

                if(isGoodSection) {
                    htmlContent += parser(element).html();
                }
            });


            //pull out definition
            //pull out parent terms
            //pull out child terms

            return NextResponse.json({'html': htmlContent});
        });
}