export default function ResultUI({
    wpm, correctness, onContinue,
} : {
    wpm: number, correctness: number, onContinue?: () => void;
}) {
    return (
        <div>
            <div className={'w-[400px] flex justify-around items-center'}>
                <div>
                    <div className={'text-lg'}>Test score:</div>
                    <div className={'text-3xl'}>{Math.round(wpm)} wpm</div>
                </div>
                <div>
                    <div className={'text-lg'}>Correctness:</div>
                    <div className={'text-3xl'}>{Math.round(correctness * 100)}%</div>
                </div>
            </div>
            <div className={'flex justify-center mt-6'}>
                <button
                    onClick={onContinue}
                    className="
                        bg-slate-600 px-4 py-2 rounded cursor-pointer
                        hover:shadow-xl hover:shadow-slate-700 transition-all
                    "
                >Another one</button>
            </div>
        </div>
    )
}