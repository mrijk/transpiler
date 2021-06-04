const fmap = new Map([
    ['print', 'println']
])

function* cond({options}) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname} "${params[0]}"`
}

const groovy = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `def ${name}() {`,
        `}`
    ],
    
    main: {
        start: 'def main() {',
        end: '}\n\n' +
            'main()'
            
    },

    
    decl: ({name, type, value}) => `def ${name} = ${value}`,
    
    cond,
    fcall
}

module.exports = {
    groovy
}
