import {Fragment} from "react";

type WordProps = {
    content: string,
    typedText: string,
    isActive: boolean,
}

export default function Word({ content, typedText, isActive } : WordProps) {
    const segments: { content: string, status: 'correct' | 'incorrect' | 'untyped' }[] = []

    for (let i = 0, l = content.length; i < l; i++) {
        let charStatus: 'correct' | 'incorrect' | 'untyped';
        if (i >= typedText.length) charStatus = 'untyped';
        else if (content[i] == typedText[i]) charStatus = 'correct';
        else charStatus = 'incorrect';

        const displayChar = charStatus == 'untyped' ? content[i] : typedText[i]

        if (segments.length != 0 && segments[segments.length - 1].status == charStatus) {
            segments[segments.length - 1].content += displayChar;
        } else {
            segments.push({ content: displayChar, status: charStatus });
        }
    }

    segments.push({ content: ' ', status: 'untyped' })

    const firstUntypedSegment = segments.findIndex(segment => segment.status == 'untyped')

    function getClassName(status: 'correct' | 'incorrect' | 'untyped') {
        switch (status) {
            case 'correct':
                return 'correct text-emerald-400';
            case 'incorrect':
                return 'incorrect text-rose-400';
            case 'untyped':
                return 'untyped text-slate-400';
        }
    }

    return <>
        {segments.map((segment, i) => (
            <Fragment key={i}>
                {(isActive && i == firstUntypedSegment) && (
                    <span className={'outline outline-amber-400'}></span>
                )}
                <span className={getClassName(segment.status)} key={i}>
                    {segment.content}
                </span>
            </Fragment>
        ))}
    </>
}