const ruby = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `def ${name}()`,
        `end`
    ],
    
    main: {
        start: `def main()`,
        end: `end\n\n` +
            `main`
    },

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
    ruby
}
