import React, {PureComponent} from 'react'

class Greeter {
    constructor(public greeting: string) {
    }

    greet(): string {
        return `<h1>${this.greeting}</h1>`;
    }
}

const greeter = new Greeter('Hello, world!');

const MMM = (
    <div>
        {greeter.greet()}
    </div>
);


export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

export function Hello({name, enthusiasmLevel = 1}: Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    );
}


function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}


class LL extends PureComponent<Props> {

    render() {

        return (
            <div>
            </div>
        )
    }
}


export const O = (<LL name={greeter.greet()}/>)

export default MMM

