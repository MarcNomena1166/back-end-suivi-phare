
  module.exports={
    dateIsValid:async(date)=>{
        return date instanceof Date && !isNaN(date);
    }
  }