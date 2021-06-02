function* cond({options}) {
    yield `if ${options[0].predicate}:`
    yield `  ${options[0].expr}`
    yield `else:`
    yield `  ${options[1].expr}`
}

const python = {
    comment: comment => `# ${comment}`,

    functionDecl: ({name, params, body}) => [
        `def ${name}():`,
        `  pass`
    ],
    
    main: {
        start: `def main():`,
        end: '\nif __name__ == "__main__":\n' +
            '  main()'
    },

    decl: ({name, type, value}) => `${name} = ${value}`,

    cond
}

module.exports = {
    python
}
