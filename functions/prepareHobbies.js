const prepareHobbies = (str) => {
    let arr = [];
    for(let i = 0; i < str.length; i++){
        let j = i;
        var temp = "";
        while(str[j] != ',' && j < str.length){
            temp = temp + str[j];
            j++;
        }
        arr.push(temp.trim());
        i = j++;
    }
    return arr;
}

module.exports = prepareHobbies;