// ast2: simple if/then

const ast = {
    package: {
        name: 'main',
        file: '',
        functions: [
            {
                name: 'main',
                params: [],
                returns: "int",
                body: {
                    stmts: [
                        {
                            t: "decl",
                            name: "x",
                            type: "int",
                            expr: {
                                t: "const",
                                value: "5"
                            }
                        },
                        {
                            t: "cond",
                            options: [
                                {
                                    predicate: {
                                        op: "<",
                                        expr1: {
                                            t: "sym",
                                            value: "x"
                                        },
                                        expr2: {
                                            t: "const",
                                            value: 5
                                        }
                                    },
                                    body: {
                                        stmts: [
                                            {
                                                t: "fcall",
                                                name: "print",
                                                params: [
                                                    "x less than 5!"
                                                ]                                                
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
}

module.exports = {
    ast
}
