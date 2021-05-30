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
    
    cond: ({options}) =>
    [
        `if ${options[0].predicate} {`,
        `  ${options[0].expr}`,
        `} else {`,
        `  ${options[1].expr}`,
        `}`
    ]  
}

module.exports = {
    swift
}
