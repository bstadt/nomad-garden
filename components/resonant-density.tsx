'use client'
import { dictionary } from 'cmu-pronouncing-dictionary'
import { useState } from 'react';
dictionary['agglomerant'] = 'AE G L AA M EH R AN T';
dictionary['utils'] = 'Y UW T IH L Z';
dictionary['tills'] = 'T IH L Z';
dictionary['rigid'] = 'R IH JH IH D';
dictionary['positing'] = 'P AA Z IH T IH NG';
dictionary['logits'] = 'L AA JH IH S';
dictionary['neological'] = 'N IY OW L AA JH IH K AH L';


const WordHighlight = ({ words, adjacencyMatrix }) => {
    const [highlightedWords, setHighlightedWords] = useState([]);

    const handleMouseOver = (index) => {
        const newHighlightedWords = [];
        for (let i = 0; i < adjacencyMatrix[index].length; i++) {
            if (adjacencyMatrix[index][i] > 0 || index === i) {
                newHighlightedWords.push({ index: i, weight: adjacencyMatrix[index][i] });
            }
        }
        newHighlightedWords.push({index: index, weight: 1})
        setHighlightedWords(newHighlightedWords);
    };

    const handleMouseOut = () => {
        setHighlightedWords([]);
    };

    return (
        <div className="flex flex-wrap hover:cursor-pointer">
            {words.map((word, index) => {
                const highlightStyle = {};
                highlightedWords.forEach((highlight) => {
                    if (highlight.index === index) {
                        switch (highlight.weight) {
                            case 1:
                                highlightStyle.backgroundColor = '#ffba00';
                                break;
                            case 2:
                                highlightStyle.backgroundColor = '#006895';
                                break;
                            case 3:
                                highlightStyle.backgroundColor = '#1c9518';
                                break;
                            default:
                                break;
                        }
                    }
                });

                return (
                    <div
                        key={index}
                        style={{
                            marginRight: '4px',
                            backgroundColor: highlightStyle.backgroundColor || 'transparent',
                        }}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={handleMouseOut}
                    >
                        {word}
                    </div>
                );
            })}
        </div>
    );
};

export default function ResonantDensity(props){

    const removeNonAlphaChars = (str) => {
        return str.replace(/[^a-zA-Z]/g, '');
    }

    function hasVowels(str) {
        return /[aeiouyAEIOUY]/.test(str);
    }

    function intersect(list1, list2) {
        const set1 = new Set(list1);
        for (let element of list2) {
            if (set1.has(element)) {
                return true;
            }
        }
        return false;
    }

    const get_phonemes = (word) => {
        const phonemes = dictionary[word];
        if(phonemes ===  undefined){
            console.log(word);
        }
        return phonemes;
    }

    const words = props.text.split(' ');
    const phones_per_word = words
        .map(word => removeNonAlphaChars(word.toLowerCase()))
        .map(normword => get_phonemes(normword))
        .map(phone => phone.split(' '))
        .map(phonevec => phonevec.map(phone=> removeNonAlphaChars(phone)));

    const assonant_phones_per_word = phones_per_word.map(sublist => sublist.filter(hasVowels));

    //compute word graph
    const create2DArrayWithZeros = (n) => Array.from({ length: n }, () => Array(n).fill(0));
    var wordGraph = create2DArrayWithZeros(words.length)
    var edges = 0;

    for (let i = 0; i < assonant_phones_per_word.length; i++) {
        for (let j = i + 1; j < assonant_phones_per_word.length; j++) {
            var word_1_phones = assonant_phones_per_word[i]
            var word_2_phones = assonant_phones_per_word[j]
            if(intersect(word_1_phones, word_2_phones) ) {
                wordGraph[i][j] = 1;
                wordGraph[j][i] = 1;
                edges += 1;
            }
        }
    }

    //compute density (expected links per phoneme)
    const phones = [].concat(...assonant_phones_per_word);

    var density = (2*edges + phones.length)/ (phones.length**2);
    density = density.toFixed(3);


    return(
    <div className="flex flex-wrap">
        <div className="w-1/4 p-4">
            <p className="inline-block mr-4">Density: {density} </p>
        </div>
        <div className="w-3/4 p-4">
            <WordHighlight words={words} adjacencyMatrix={wordGraph}/>
        </div>
    </div>);
}