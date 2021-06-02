function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
}

const go = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `func ${name}() {`,
        `}`
    ],
    
    main: {
        start: "package main\n\n" + 
            "func main() {",
        end: "}"
    },

    
    decl: ({name, type, value}) => `var ${name} ${type} = ${value}`,
    
    cond
}

module.exports = {
    go
}
