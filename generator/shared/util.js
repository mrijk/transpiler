function methodLookup(omap, name, type) {
    const methods = omap.get(type)
    if (methods === undefined) {
        return name
    } else {
        return methods.get(name)
    }
}

module.exports = {
    methodLookup
}

