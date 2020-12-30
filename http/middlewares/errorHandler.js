require('dotenv')
module.exports = (err,req,res,next)=>{
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    error: true,
    message: err.message,
    stack:process.env.NODE_ENV == 'production'?undefined:err.stack
  });
}