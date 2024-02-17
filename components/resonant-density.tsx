'use client'
import { dictionary } from 'cmu-pronouncing-dictionary'
import { useState } from 'react';

const WordUnderline = ({ words, adjacencyMatrix }) => {
    const [underlinedWords, setUnderlinedWords] = useState([]);

    const handleMouseOver = (index) => {
        const newUnderlinedWords = [];
        for (let i = 0; i < adjacencyMatrix[index].length; i++) {
            if (adjacencyMatrix[index][i] === 1 || index === i) {
                newUnderlinedWords.push(i);
            }
        }
        setUnderlinedWords(newUnderlinedWords);
    };

    const handleMouseOut = () => {
        setUnderlinedWords([]);
    };

    return (
        <div style={{ fontFamily: 'Arial' }}>
            {words.map((word, index) => (
                <span
                    key={index}
                    style={{ marginRight: '10px', textDecoration: underlinedWords.includes(index) ? 'underline' : 'none' }}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                >
          {word}
        </span>
            ))}
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

    const words = props.text.split(' ');
    const phones_per_word = words
        .map(word => removeNonAlphaChars(word.toLowerCase()))
        .map(normword => dictionary[normword])
        .map(phone => phone.split(' '))
        .map(phonevec => phonevec.map(phone=> removeNonAlphaChars(phone)));

    //const assonant_phones_per_word = phones_per_word.map(sublist => sublist.filter(hasVowels));

    //compute word graph
    const create2DArrayWithZeros = (n) => Array.from({ length: n }, () => Array(n).fill(0));
    var wordGraph = create2DArrayWithZeros(words.length)

    for (let i = 0; i < phones_per_word.length; i++) {
        for (let j = i + 1; j < phones_per_word.length; j++) {
            var word_1_phones = phones_per_word[i]
            var word_2_phones = phones_per_word[j]
            if(intersect(word_1_phones, word_2_phones)) {
                wordGraph[i][j] = 1;
                wordGraph[j][i] = 1;
            }
        }
    }

    //compute density (expected links per phoneme)
    const phones = [].concat(...phones_per_word);
    const countMap = {};
    var edges = 0;
    phones.forEach(item => {
        countMap[item] = (countMap[item] || 0) + 1;
        edges += countMap[item];
    });
    const density = edges/phones.length;
    console.log(phones)


    return(<div>
        <p>{density}</p>
        <WordUnderline words={words} adjacencyMatrix={wordGraph}/>
    </div>);
}