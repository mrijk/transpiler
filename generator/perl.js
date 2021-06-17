// node index.js | perl

const {isEmpty, join} = require('lodash')

const perl = {
    language: 'Perl',
    extension: 'pl',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(perl)

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if (${parsePredicate(predicate)}) {`
    yield* parseBody(body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `} elsif (${options[i].predicate}) {`
        yield* parseBody(options[i].body)
        yield '}'
    }
    yield `} else {`
    yield* parseBody(options[n].body)
    yield `}`
}

function* cond({options}) {
    switch (options.length) {
    case 1:
        yield* cond1(options)
        break
    default:
        yield* condn(options)
    }
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
    yield* parseBody(body)
    yield '}'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, expr}) {
    yield `$${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    yield `sub {${parsedBody}};`
}

module.exports = {
    perl
}
