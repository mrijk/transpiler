// factorial: calculate n! recursively

const ast = {
    package: {
        name: 'main',
        file: '',
        functions: [
            {
                name: "factorial",
                params: [
                    {
                        name: "n",
                        type: "int"
                    }
                ],
                returns: "int",
                body: {
                    stmts: [
                        {
                            t: "cond",
                            options: [
                                {
                                    predicate: {
                                        op: "=",
                                        expr1: {
                                            t: "sym",
                                            value: "n"
                                        },
                                        expr2: {
                                            t: "const",
                                            value: 0
                                        }
                                    },
                                    body: {
                                        stmts: [
                                            {
                                                t: "return",
                                                expr: {
                                                    t: "const",
                                                    value: 1
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    body: {
                                        stmts: [
                                            {
                                                t: "fcall",
                                                name: "factorial",
                                                params: [
                                                    6
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                name: "main",
                params: [],
                returns: "int",
                body: {
                    stmts: [
                        {
                            t: "fcall",
                            name: "factorial",
                            params: [
                                5
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

