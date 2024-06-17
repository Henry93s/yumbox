module.exports = (req, res, next) => {
    if(req.user.email !== req.body.email && req.user.is_admin === false){
        const error = new Error();
        Object.assign(error, {code: 401, message: "접근할 수 없는 요청입니다."})
        throw error;
    }
    next();
}