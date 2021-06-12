const {isEmpty, join} = require('lodash')

const elixir = {
    language: 'Elixir',
    extension: 'ex',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

const {parseBody, parseFunctions} = require('./shared/shared')(elixir)

const fmap = new Map([
    ['print', 'IO.puts']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield 'defmodule ExampleApp.CLI do'
    yield* parseFunctions(functions, 1)
    yield 'end'
}

function* cond1(options) {
    yield `if ${options[0].predicate} do`
    yield* parseBody(options[0].body)
    yield `end`
}

function* cond2(options) {
    yield `if ${options[0].predicate} do`
    yield* parseBody(options[0].body)
    yield `else`
    yield* parseBody(options[1].body)
    yield `end`
}

function* condn(options) {
    const n = options.length - 1
 
    yield `cond do`
    for (i = 0; i < n; i++) {
        const body = Array.from(parseBody(options[i].body))
        yield `  ${options[i].predicate} -> ${body}}`
    }
    const body = Array.from(parseBody(options[n].body))
    yield `  true -> ${body}`
    yield 'end'
}

function* cond({options}) {
    switch (options.length) {
    case 1:
        yield *cond1(options)
        break
    case 2:
        yield *cond2(options)
        break
    default:
        yield *condn(options)
    }
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (isEmpty(params)) {
        yield `${fname}()`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }
}

function* fdecl({name, params, body}) {
    yield `defp ${name}() do`
    yield* parseBody(body)
    yield `end`    
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

module.exports = {
    elixir
}
