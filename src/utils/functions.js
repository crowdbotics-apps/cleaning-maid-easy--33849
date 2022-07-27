export const addEllipsis = (string, characters = 2) => {
    if (string.length > (characters * 2)) {
        return string.substr(0, characters) + '****' + string.substr(string.length - characters, string.length);
    }
    return string;
};

export const emailEllipsis = (str, characters = 3) => {
    let splitedEmail = str.split('@');
    let username = splitedEmail[0];
    if (username.length > characters) {
      return username.substr(0, characters) + '****' +'@'+splitedEmail[1]
    }
  };