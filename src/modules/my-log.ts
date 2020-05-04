const info = (text: String): String => {
    console.log("INFO:", text);
    return text;
};

const error = (text: String): String => {
    console.log("ERROR:", text);
    return text;
};

//module.exports = { info, error }; -- Exportacion global

export { info, error};
