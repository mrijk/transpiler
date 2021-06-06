const ast = {
    functions: [
        {
            name: "functionOne",
            params: [],
            body: [
                {
                    type: "fcall",
                    name: "print",
                    params: [
                        "Hello from functionOne!"
                    ]
                }
            ]
        }
    ],
    
    main: {
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

module.exports = {
    ast
}
