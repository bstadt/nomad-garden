'use client'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next';

export default function LatexFormula(props){
    return(<div>
        <Latex output='mathml'>{props.formula}</Latex>
    </div>);
}