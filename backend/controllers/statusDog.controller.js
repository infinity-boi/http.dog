// const validCodes = { '1':{'10':[100,101,102,103]}, 
// '2': {'20':[200,201,202,203,204,205,206,207,208], '21':[218], '22':[226]}, 
// '3':{'30':[300,301,302,303,304,305,306,307,308]}, 
// '4':{'40':[400,401,402,403,404,405,406,407,408,409], '41':[410,411,412,413,414,415,416,417,418,419], '42':[420,421,422,423,424,425,426,429], '43':[430,431], '44': [440,444,449], '45': [450,451], '46': [460,463,464], '49':[494,495,496,497,498,499]}, 
// '5': {'50':[500,501,502,503,504,505,506,507,508,509], '51':[510,511], '52':[520,521,522,523,524,525,526,527,529], '53':[530], '56':[561], '59':[598, 599]}};

const validCodes = {
    '1': { '10': [100, 101, 102, 103] },
    '2': { '20': [200, 201, 202, 203, 204, 205, 206, 207, 208], '21': [218], '22': [226] },
    '3': { '30': [300, 301, 302, 303, 304, 305, 306, 307, 308] },
    '4': {
      '40': [400, 401, 402, 403, 404, 405, 406, 407, 408, 409],
      '41': [410, 411, 412, 413, 414, 415, 416, 417, 418, 419],
      '42': [420, 421, 422, 423, 424, 425, 426, 429],
      '43': [430, 431],
      '44': [440, 444, 449],
      '45': [450, 451],
      '46': [460, 463, 464],
      '49': [494, 495, 496, 497, 498, 499],
    },
    '5': {
      '50': [500, 501, 502, 503, 504, 505, 506, 507, 508, 509],
      '51': [510, 511],
      '52': [520, 521, 522, 523, 524, 525, 526, 527, 529],
      '53': [530],
      '56': [561],
      '59': [598, 599],
    },
  };

export const searchCode = async (req, res) => {
    const filter = req.params.filter;
    console.log(filter);
    if(filter.length!=3 || isNaN(filter[0])){
        return {}
    }
    const responseCodes = [];
    const prefix = filter.replace('x', '');
    if(prefix.length==3){
        console.log(prefix);
    }
    if(filter[2]!='x'){
        console.log("Invalid input");
    }
    if (validCodes[prefix[0]]) {
        const subCategories = validCodes[prefix[0]];
        if(prefix.length==1){
            Object.keys(subCategories).forEach((key) => {
                responseCodes.push(...subCategories[key]);
            });
        }
        else{
            Object.keys(subCategories).forEach((key) => {
                if (key==prefix) {
                    responseCodes.push(...subCategories[key]);
                }
            });
        }
        console.log(validCodes);
    }
    else{
        console.log("No Code")
    }
  
    const imageUrls = responseCodes.map(code => ({
      code,
      imageUrl: `https://http.dog/${code}.jpg`
    }));
  
    res.json(imageUrls);
};