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

    cond: ({options}) =>
    [
        `if ${options[0].predicate}:`,
        `  ${options[0].expr}`,
        `else:`,
        `  ${options[1].expr}`
    ]    
}

module.exports = {
    python
}
