function* cond({options}) {
    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    yield `else`
    yield `  ${options[1].expr}`
    yield `end`
}

const julia = {
    comment: comment => `# ${comment}`,
    
    main: {
        start: "function main()",
        end: "end\n\n" +
            "main()"
    },

    functionDecl: ({name, params, body}) => [
        `function ${name}()`,
        `end`
    ],
    
    decl: ({name, type, value}) => `${name} = ${value}`,
    
    cond
}

module.exports = {
    julia
}
