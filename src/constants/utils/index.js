const getRandomIntBetweemMinAndMax = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const utils = {
    getRandomIntBetweemMinAndMax,
}

export default  utils;