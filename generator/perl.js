const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr};`
    yield `} else {`
    yield `  ${options[1].expr};`
    yield '}'
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (isEmpty(params)) {
        yield `${fname}();`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}");`
    }
}

function* fdecl({name, params, body}) {
    yield `sub ${name}() {`
    yield* parseBody(body, perl)
    yield '}'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `$${name} = ${value};`
}

const perl = {
    language: 'Perl',
    extension: 'pl',

    comment,
    cond,
    decl,
    fcall,
    fdecl
}

module.exports = {
    perl
}
