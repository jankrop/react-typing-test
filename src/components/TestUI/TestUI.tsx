import {type ChangeEvent, useState, useRef} from "react";
import Word from "../Word";

type TestAreaProps = {
    text: string;
    onFinish: (wpm: number, correctness: number) => void;
}

type WordObject = {
    content: string;
    typedText: string;
    isActive: boolean;
}

export default function TestUI({ text, onFinish }: TestAreaProps) {
    const [startTime, setStartTime] = useState(0);
    const [words, setWords] = useState<WordObject[]>(
        text.trim().split(' ').map<WordObject>(wordString => { return {
            content: wordString,
            typedText: '',
            isActive: false,
        } })
    );
    const [currentWordId, setCurrentWordId] = useState<number>(0);

    function handleTyping(ev: ChangeEvent<HTMLInputElement>) {
        if (startTime == 0) setStartTime(Date.now());  // Initializes test on first type

        if (ev.target.value.length == 0) {
            console.log('Going back...')
            if (currentWordId == 0) return;
            setCurrentWordId(currentWordId - 1);
            setWords(words.map<WordObject>(
                (word, i) =>
                    i == currentWordId - 1 ? {...word, isActive: true} : {...word, isActive: false})
            )
            return;
        }

        const typedText = ev.target.value.slice(1);
        console.log(`"${ev.target.value}" "${typedText}"`)

        const isSubmitted = typedText[typedText.length - 1] == ' ';

        setWords(words.map<WordObject>((w, i) => {
            // Adds newly written text to current word
            if (i == currentWordId && !isSubmitted) return {...w, typedText: typedText, isActive: true};
            if (i == currentWordId + 1 && isSubmitted) return {...w, isActive: true};  // Activates the next word
            return {...w, isActive: false};
        }));

        if (isSubmitted) {  // Handles word submitting
            if (currentWordId == words.length - 1) {  // Finishing the test
                const time = Date.now() - startTime;
                const correctness = words.filter(
                    word => word.content == word.typedText
                ).length / words.length;
                const wpm = text.length / 5 / time * 60_000 * correctness;
                onFinish(wpm, correctness);
            } else {  // Moving on to the next word
                setCurrentWordId(currentWordId + 1);
            }
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    function handleBlur() {
        inputRef.current?.focus();
    }

    return (
        <>
            <div data-testid="text" className={'w-full max-w-[800px] text-2xl select-none'}>
                {words.map((word, index) => (
                    <Word key={index} {...word} />
                ))}
            </div>
            <input
                type="text"
                autoFocus
                value={' ' + words[currentWordId].typedText}
                onChange={handleTyping}
                onBlur={handleBlur}
                ref={inputRef}
                className={'opacity-0 w-0 h-0'}
            />
        </>
    );
}