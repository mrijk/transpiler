const fmap = new Map([
    ['print', 'print']
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

const swift = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `func ${name}() {`,
        `}`
    ],
    
    main: {
        start: "func main() {",
        end: "}"
    },

    
    decl: ({name, type, value}) => `var ${name} = ${value}`,
    
    cond,
    fcall
}

module.exports = {
    swift
}
