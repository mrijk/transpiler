const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield '}'
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname} "${params[0]}";`
}

function* fdecl({name, params, body}) {
    yield 'sub Main() {'
    yield* parseBody(body, perl)
    yield '}'
    if (name === 'main') {
        yield ''
        yield 'Main()'
    }
}

const perl = {
    language: 'Perl',
    
    decl: ({name, type, value}) => `var ${name} = ${value}`,

    comment,
    cond,
    fcall,
    fdecl
}

module.exports = {
    perl
}
