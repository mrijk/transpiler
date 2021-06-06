const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'println!']
])

function* main({stmts}, parseBody) {
    yield 'fn main() {'
    yield* parseBody(stmts)
    yield '}'
}

function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield '}'
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (isEmpty(params)) {
    } else {
        const paramString = join(params)
        yield `${fname} "${paramString}"`
    }
}

const rust = {
    comment: comment => `// ${comment}`,

    
    functionDecl: ({name, params, body}) => [
        `fn ${name}() {`,
        `}`
    ],

    decl: ({name, type, value}) => `let ${name} = ${value};`,

    main,
    cond,
    fcall
}

module.exports = {
    rust
}
