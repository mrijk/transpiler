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
    
    cond: ({options}) =>
    [
        `if ${options[0].predicate}`,
        `  ${options[0].expr}`,
        `else`,
        `  ${options[1].expr}`,
        `end`
    ]
}

module.exports = {
    julia
}
