// node index.js | gcc -x c -

const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'printf']
])

function comment(comment) {
    return `/* ${comment} */`
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
    if (isEmpty(params)) {
        yield `${fname}();`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}");`
    }
}

function* fdecl({name, params, returns, body}) {
    yield `${returns} ${name}() {`
    yield* parseBody(body, C)
    if (name === 'main') {
        yield '  return 0;'
    }
    yield '}'
}

const C = {
    language: 'C',

    decl: ({name, type, value}) => `var ${name} = ${value}`,

    comment,
    main,
    cond,
    fcall,
    fdecl
}

module.exports = {
    C
}
