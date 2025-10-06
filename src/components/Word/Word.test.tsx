import {render, screen} from "@testing-library/react";
import Word from "./Word";

test('renders content', () => {
    render(
        <div data-testid="words">
            <Word content="foo" typedText="foo" isActive={false} />
            <Word content="bar" typedText="" isActive={false} />
        </div>
    );

    const words = screen.getByTestId('words');

    expect(words).toHaveTextContent('foo bar');
})

test('displays word status and correctness', () => {
    render(
        <>
            <Word content="lorem" typedText="lorem" isActive={false} />
            <Word content="ipsum" typedText="ipshh" isActive={false} />
            <Word content="dolor" typedText="dol" isActive={false} />
            <Word content="sit" typedText="" isActive={false} />
        </>
    );

    const correctWord = screen.getByText(/^lorem$/);
    const correctPartOfIncorrectWord = screen.getByText(/^ips$/);
    const incorrectPartOfIncorrectWord = screen.getByText(/^hh$/);

    const currentWordTyped = screen.getByText(/^dol$/);
    const currentWordUntyped = screen.getByText(/^or$/);

    const untypedWord = screen.getByText(/^sit$/);

    expect(correctWord).toHaveClass('correct');
    expect(correctPartOfIncorrectWord).toHaveClass('correct');
    expect(incorrectPartOfIncorrectWord).toHaveClass('incorrect');
    expect(currentWordTyped).toHaveClass('correct');
    expect(currentWordUntyped).toHaveClass('untyped');
    expect(untypedWord).toHaveClass('untyped');
})