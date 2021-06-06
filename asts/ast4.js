const ast = {
    package: {
        name: 'main',
        file: '',
        functions: [
            {
                name: "functionOne",
                params: [],
                returns: "void",
                body: {
                    stmts: [
                        {
                            type: "fcall",
                            name: "print",
                            params: [
                                "Hello from functionOne!"
                            ]
                        }
                    ]
                }
            },
            {
                name: 'main',
                params: [],
                returns: "int",
                body: {
                    stmts: [
                        {
                            type: "fcall",
                            name: "functionOne",
                            params: []
                        },
                        {
                            type: "fcall",
                            name: "print",
                            params: [
                                "Hello world!"
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
