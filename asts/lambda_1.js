// lambda_1: lambda declaration and execution

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
                                            t: "fcall",
                                            name: "print",
                                            params: [
                                                "Hello Lambda!"
                                            ]
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
