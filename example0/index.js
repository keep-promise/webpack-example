import { add } from './a';


export function render() {
  document.write(`<div>${add('hello', ' world')}</div>`)
}

