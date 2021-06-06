const _ = require('lodash')

const fmap = new Map([
    ['print', 'IO.puts']
])

function* main({stmts}, parseBody) {
    yield 'defmodule ExampleApp.CLI do'
    yield '  def main(args \\\\ []) do'
    yield* parseBody(stmts)
    yield '  end'
    yield 'end'
}

function* cond({options}) {
    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    yield `else`
    yield `  ${options[1].expr}`
    yield `end`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (_.isEmpty(params)) {
        yield `${fname}`
    } else {
        const paramString = _.join(params)
        yield `${fname} "${paramString}"`
    }
}

function* fdecl({name, params, body}) {
//    yield `defp ${name}()`
//    yield `end`    
}

const elixir = {
    comment: comment => `# ${comment}`,

    decl: ({name, type, value}) => `${name} = ${value}`,

    main,
    cond,
    fcall,
    fdecl
}

module.exports = {
    elixir
}
