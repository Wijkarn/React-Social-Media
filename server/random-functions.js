function createDate() {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function isASCII(str) {
    // Create a regular expression to match non-ASCII characters
    const asciiRegex = /^[\x00-\x7F]*$/;
    // Test if the string matches the regular expression
    return asciiRegex.test(str);
}

function getFetchOptions(method, data) {
    method.toUpperCase();

    const options = {
        method,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    return options;
}

module.exports = {
    createDate,
    isASCII,
    getFetchOptions
}