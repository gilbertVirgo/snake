import randomstring from "randomstring";

export const generateString = () =>
    randomstring.generate({
        length: 10,
        charset: "alphanumeric"
    });