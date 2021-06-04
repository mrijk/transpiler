const ast = {
    functions: [
        {name: "functionOne",
         params: [],
         body: []
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
