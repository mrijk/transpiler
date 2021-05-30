const node = {
    comment: comment => `// ${comment}`,


    functionDecl: ({name, params, body}) => [
        `function ${name}() {`,
        `}`
    ],
    
    main: {
        start: "function main() {",
        end: "}"
    },

    
    decl: ({name, type, value}) => `const ${name} = ${value}`,
    
    cond: ({options}) =>
    [
        `if (${options[0].predicate}) {`,
        `  ${options[0].expr}`,
        `} else {`,
        `  ${options[1].expr}`,
        `}`
    ]  
}

module.exports = {
    node
}
