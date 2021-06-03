const ast = {
    functions: [
    ],
    
    main: {
        stmts: [
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
