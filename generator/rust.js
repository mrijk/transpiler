const fmap = new Map([
    ['print', 'println!']
])

function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield '}'
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
}

const rust = {
    comment: comment => `// ${comment}`,

    
    functionDecl: ({name, params, body}) => [
        `fn ${name}() {`,
        `}`
    ],
    
    main: {
        start: "fn main() {",
        end: "}"
    },

    
    decl: ({name, type, value}) => `let ${name} = ${value};`,
    
    cond,
    fcall
}

module.exports = {
    rust
}
