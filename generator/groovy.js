const groovy = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `def ${name}() {`,
        `}`
    ],
    
    main: {
        start:  "def main() {",
        end: "}"
    },

    
    decl: ({name, type, value}) => `def ${name} = ${value}`,
    
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
    groovy
}
