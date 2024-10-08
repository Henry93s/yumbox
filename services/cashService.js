const {Cash} = require('../models');

class CashService {
    // create (bodyData : user_nanoid)
    async createCash(bodyData){
        const cash = await Cash.findOne(bodyData);
        if(cash){
            const error = new Error();
            Object.assign(error, {code: 400, message: "이미 생성된 적립금 데이터입니다."})
            throw error;
            
        } else {
            return await Cash.create(bodyData);
        }
    }

    // find
    async findAllCash(){
        const cashes = await Cash.find();
        return cashes;
    }

    // findOne
    async findById({user_nanoid}) {
        const cash = await Cash.findOne({user_nanoid});
        if(!cash){
            const error = new Error();
            Object.assign(error, {code: 404, message: "조회된 적립금 데이터가 없습니다."})
            throw error;
        }
        return cash;
    }

    // update (bodyData : cash)
    async updateById({user_nanoid}, bodyData){
        const cash = await Cash.findOne({user_nanoid});
        if(!cash){
            const error = new Error();
            Object.assign(error, {code: 404, message: "조회된 적립금 데이터가 없습니다."})
            throw error;
            
        } else {
            // bodyData.cash 가 있는 경우에만 update
            if(bodyData.cash){
                await Cash.updateOne(cash, {
                    $inc: {cash: bodyData.cash}
                });
                return {message: `${user_nanoid} 적립금 변경 동작 완료`};
            }
            return {message: `${user_nanoid} 적립금 변경 없음`};
        }
    }

    // delete
    async deleteById({user_nanoid}) {
        const cash = await Cash.findOne({user_nanoid});
        if(!cash){
            const error = new Error();
            Object.assign(error, {code: 404, message: "조회된 적립금 데이터가 없습니다."})
            throw error;
            
        } else {
            await Cash.deleteOne(cash);
            return {message: `${user_nanoid} 적립금 삭제 동작 완료`};
        }
    }
}

const cashService = new CashService();
module.exports = cashService;