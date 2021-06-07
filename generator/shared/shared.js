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

function* parseBody({stmts}, generator) {
    yield* stmts.flatMap(stmt => Array.from(parseStmt(stmt, generator)))
}

module.exports = {
    parseBody
}
