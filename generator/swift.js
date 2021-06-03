function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield '}'
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
    
    cond
}

module.exports = {
    swift
}
