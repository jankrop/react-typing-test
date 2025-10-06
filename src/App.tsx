import './App.css'
import TestUI from "./components/TestUI";
import words from './words.json';
import {useState} from "react";
import ResultUI from "./components/ResultUI";

function App() {
    const [status, setStatus] = useState<'test' | 'result'>('test');
    const [result, setResult] = useState<{wpm: number, correctness: number}>({wpm: 0, correctness: 0});
    let text = '';

    function generateTest() {
        const testLength = 50;
        for (let i = 0; i < testLength; i++) {
            if (i != 0) text += ' ';
            text += words[Math.floor(Math.random() * words.length)];
        }
    }

    generateTest();

    function handleTestFinish(wpm: number, correctness: number) {
        setResult({wpm: wpm, correctness: correctness});
        setStatus('result');
    }

    function handleContinue() {
        generateTest();
        setStatus('test');
    }

    return (
        <div className={'w-screen h-screen flex flex-col font-mono text-white'}>
            <div className={'bg-slate-700'}>
                <div className={'max-w-[1200px] mx-auto flex justify-between'}>
                    <div className={'p-3 text-2xl select-none'}>react-typing-test</div>
                    <div className={'p-3 flex justify-center items-center select-none'}>
                        <a href={'https://github.com/jankrop/react-typing-test'}>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
            <div className={'bg-slate-800 flex-1 flex justify-center items-center'}>
                { status == 'test' ? (
                    <TestUI
                        text={text}
                        onFinish={handleTestFinish}
                    />
                ) : (
                    <ResultUI onContinue={handleContinue} {...result} />
                )}
            </div>
        </div>
    )
}

export default App
