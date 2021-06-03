const fmap = new Map([
    ['print', 'println']
])

function* cond({options}) {
    const count = options.length

    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    for (i = 1; i < count - 1; i++) {
        const {predicate, expr} = options[i]
        yield `elseif ${predicate}`
        yield `  ${expr}`
    }
    yield `else`
    yield `  ${options[count - 1].expr}`
    yield `end`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
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
    
    cond,
    fcall
}

module.exports = {
    julia
}
