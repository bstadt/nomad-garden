import * as cheerio from 'cheerio';
import {NextResponse} from "next/server";
import {found} from "@jridgewell/trace-mapping/dist/types/binary-search";

function splitHtmlIntoChunks(html) {
    const sentences = [];
    let insideTag = false;
    let currentSentence = '';

    for (let i = 0; i < html.length; i++) {
        const char = html[i];

        if (char === '<') {
            insideTag = true;
            currentSentence += char;
        } else if (char === '>') {
            insideTag = false;
            currentSentence += char;
        } else if (char === '.' && !insideTag) {
            // Split sentence when a period is not within a tag
            sentences.push(currentSentence.trim() + char);
            currentSentence = '';
        } else {
            currentSentence += char;
        }
    }

    // Add any remaining text as a sentence
    if (currentSentence.trim() !== '') {
        sentences.push(currentSentence.trim());
    }

    return sentences;
}



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

            //parse!
            const parser = cheerio.load(data);

            //Remove info that makes it hard to navigate
            parser('img').remove();
            parser('figcaption').remove();
            parser('cite').remove();
            parser('span[class*="mw-editsection"]').remove();
            parser('span[class*="synonym"]').remove();
            parser('span[class*="antonym"]').remove();
            parser('span[class*="maintenance-line"]').remove();
            parser('div[class*="usage-example"]').remove();
            parser('div[class*="NavHead"]').remove();
            parser('div[class*="NavContent"]').remove();
            parser('div[class*="citation-whole"]').each( (index, element) => {
                const citationDiv = parser(element);
                const closestList = citationDiv.closest('ul, ol');
                if (closestList.length > 0) {
                    closestList.remove();
                }
            });

            var primarySectionsFound = 0;
            const parents = [];
            const children = [];
            const definitions = [];
            parser('h1, h2, h3, h4, h5, h6').each((index, element) => {
                const sectionTitle = parser(element).text();

                //Prevent case with several languages on one page
                if(element.name === 'h2' && sectionTitle !== 'Contents'){
                    primarySectionsFound+=1;
                }

                //Parse Etymology section for parent words
                if(sectionTitle.includes('Etymology') && primarySectionsFound < 2){
                    const nextSection = parser(element).nextUntil('h1, h2, h3, h4, h5, h6');
                    const content = parser(element).toString() + nextSection.toString();
                    const sentences = splitHtmlIntoChunks(content);
                    sentences.forEach((sentence) => {
                        //this is a hack but such is life
                        //sometimes there are sentences about what words a particular word eclipsed, and their origins
                        //there is a strange loop issue here where the parser wont work for etymologies of from or eclipsed lol
                        if((sentence.includes('from') || sentence.includes('From')) && !sentence.includes('Eclipsed')) {
                            const $ = cheerio.load(sentence);
                            $('a').each((index, element) => {
                                const href = $(element).attr('href');
                                const text = $(element).text();
                                if (href.includes('econstruction') || href.includes('#')) {
                                    parents.push({href, text});
                                }
                            });
                        }
                    });
                }

                //Parse definition sections
                if(['Noun', 'Verb', 'Adjective', 'Adverb', 'Root']
                    .map(e => sectionTitle.includes(e))
                    .reduce((a, v) => a||v, false) && primarySectionsFound < 2){
                    const nextSection = parser(element).nextUntil('h1, h2, h3, h4, h5, h6');
                    const content = nextSection.text().split('\n\n');
                    content.forEach(e => definitions.push(e))
                }

                //Parse derived terms secton
                if(sectionTitle.includes('Descendents')){
                    const nextSection = parser(element).nextUntil('h1, h2, h3, h4, h5, h6');
                    const $ = cheerio.load(nextSection);
                    $('a').each((index, element) => {
                        const href = $(element).attr('href');
                        const text = $(element).text();
                        if (href.includes('econstruction') || href.includes('#')) {
                            children.push({href, text});
                        }
                    });
                }

            });

            return NextResponse.json({parents: parents, children:children, definitions: definitions});
        });
}