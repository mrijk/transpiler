const fmap = new Map([
    ['print', 'puts']
])

function* cond({options}) {
    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    yield `else`
    yield `  ${options[1].expr}`
    yield `end`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname} "${params[0]}"`
}

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
    
    cond,
    fcall
}

module.exports = {
    ruby
}
