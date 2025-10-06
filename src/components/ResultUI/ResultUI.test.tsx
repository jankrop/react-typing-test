import {fireEvent, render, screen} from "@testing-library/react";
import ResultUI from "./ResultUI";
import {vi} from "vitest"

test('Renders test results', () => {
    render(<ResultUI wpm={69} correctness={0.9} />);

    expect(screen.getByText('69 wpm')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
})

test('Runs function on continue', () => {
    const onContinue = vi.fn();

    render(<ResultUI wpm={69} correctness={0.9} onContinue={onContinue} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onContinue).toHaveBeenCalledTimes(1);
})