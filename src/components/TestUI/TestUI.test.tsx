import {render, screen} from "@testing-library/react";
import TestUI from "./TestUI.tsx";
import {userEvent} from "@testing-library/user-event";
import {vi} from "vitest";

test('renders text', () => {
    const text = 'A quick brown fox jumps over the lazy dog.';
    render(<TestUI text={text} onFinish={() => {}} />);

    const element = screen.getByTestId('text');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
})

test('displays typed text', async () => {
    const text = 'A quick brown fox jumps over the lazy dog.';
    render(<TestUI text={text} onFinish={() => {}} />);

    const typedText = 'A quick brown fox ';
    const textToBeTyped = 'jumps over the lazy dog.';
    await userEvent.keyboard(typedText);

    typedText.trim().split(' ').forEach(word => {
        const wordElement = screen.getByText(word);
        expect(wordElement).toHaveClass('correct');
    });

    textToBeTyped.split(' ').forEach(word => {
        const wordElement = screen.getByText(word);
        expect(wordElement).toHaveClass('untyped');
    });
})

test('measures typing speed', async () => {
    const onTestFinish = vi.fn();

    const text = 'A quick brown fox ';
    render(<TestUI text={text} onFinish={onTestFinish} />);

    const startTime = Date.now();

    for (const [i, char] of Array.from(text).entries()) {
        if (i > 0) {
            await new Promise(
                // Decreasing length by 1 in division because the test starts and ends on a keystroke
                resolve => setTimeout(resolve, 50)
            );
        }
        await userEvent.keyboard(char);
    }

    const time = Date.now() - startTime;
    const wpm = text.length / 5 / time * 60_000;

    expect(onTestFinish).toHaveBeenCalledTimes(1);
    if (onTestFinish.mock.lastCall != undefined) {
        const wpmDifference = Math.abs(onTestFinish.mock.lastCall[0] - wpm);
        expect(wpmDifference).toBeLessThan(5);  // We won't exactly get an exact value due to how the test works
    }
})

test('goes back to previous word on backspace', async () => {
    const text = 'A quick brown fox jumps over the lazy dog.';
    render(<TestUI text={text} onFinish={() => {}} />);

    await userEvent.keyboard('A quick brown fox {Backspace}{Backspace}');

    expect(screen.getByText(/^fo$/)).toHaveClass('correct');
})