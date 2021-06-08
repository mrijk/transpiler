function* parseStmt(stmt, generator) {
    switch (stmt.t) {
    case 'cond':
        yield* generator.cond(stmt)
        break
    case 'fcall':
        yield* generator.fcall(stmt)
        break
    case 'decl':
        yield* generator.decl(stmt)
        break
    }
}

function* parseBody({stmts}, generator, level = 0) {
    yield* stmts.flatMap(stmt => Array.from(parseStmt(stmt, generator)).map(s => indent(level + 1, s)))
}

function indent(level, s) {
    return  ' '.repeat(level * 2) + s
}

module.exports = {
    indent,
    parseBody
}
