// lambda_1: lambda declaration with return value and execution

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
                            name: "f",
                            type: "lambda",
                            expr: {
                                t: "lambda",
                                params: [],
                                body: {
                                    stmts: [
                                        {
                                            t: "return",
                                            expr: {
                                                t: "const",
                                                value: "5"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            t: "fcall",
                            name: "f",
                            params: [
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
