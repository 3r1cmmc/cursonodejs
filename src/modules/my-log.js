const info = text => {
    console.log("INFO:", text);
    return text;
};

const error = text => {
    console.log("ERROR:", text);
    return text;
};

//module.exports = { info, error }; -- Exportacion global



module.exports.info = info; // Exportacion parcial
module.exports.error = error;