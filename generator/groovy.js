function* cond({options}) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
}

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
    
    cond
}

module.exports = {
    groovy
}
