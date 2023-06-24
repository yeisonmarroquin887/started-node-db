const sequelize = require('../utils/connection');
require('../models/Student')
require('../models/Movie')
require('../models/Actor')
require('../models/Genre')
require('../models/Director')
const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();