function* cond({options}) {
    const count = options.length

    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    for (i = 1; i < count - 1; i++) {
        yield `elseif ${options[i].predicate}`
        yield `  ${options[i].expr}`
    }
    yield `else`
    yield `  ${options[count - 1].expr}`
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
