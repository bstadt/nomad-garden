'use client'
import { dictionary } from 'cmu-pronouncing-dictionary'

export default function ResonantDensity(props){

    const removeNonAlphaChars = (str) => {
        return str.replace(/[^a-zA-Z]/g, '');
    }

    const phones = [].concat(...props.text.split(' ')
        .map(word => removeNonAlphaChars(word.toLowerCase()))
        .map(normword => dictionary[normword])
        .filter(phone => phone !== undefined)
        .map(phone => phone.split(' ')))
        .map(phone => removeNonAlphaChars(phone))

    const countMap = {};
    var edges = 0;
    phones.forEach(item => {
        countMap[item] = (countMap[item] || 0) + 1;
        //edges += countMap[item] > 1 ? countMap[item] : 0;
        edges += countMap[item];
    });
    const density = edges/phones.length;


    return(<div>
        <p>{props.text}</p>
        <p>{density}</p>
    </div>);
}