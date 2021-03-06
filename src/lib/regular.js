/**
 * Created by Administrator on 2017/5/19.
 */
/**
 * 正则判断，返回true or false 判断用户名 账号 密码
 */
import Vue from 'vue'

Vue.prototype.check_user = function (account) {
    let success = true;
    if (account.length != 0){
        if (account.match('^[A-Za-z0-9]{8,10}$')) {
            console.log("正则成功");
            return success;
        } else {
            success = false;
            console.log("正则失败");
            return success;
        }
    }else {
        return success;
    }
};


Vue.prototype.check_pwd = function(pwd) {
    let success =true;
    if (pwd.length != 0){
        if (pwd.match('^[A-Za-z0-9]{6,16}$')) {
            console.log("正则成功");
            return success;
        } else {
            console.log("正则失败");
            success=false;
            return success;
        }
    }else {
        return success;
    }

};

Vue.prototype.check_name = function(name) {
    let success =true;
    if (name.match('^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$')) {
        console.log("正则成功");
        return success;
    } else {
        console.log("正则失败");
        success=false;
        return success;
    }
};




