/**
 * Created by Administrator on 2017/4/22.
 */

export default {
    GetShow:state => {
        return state.show
    },
    /**
     * @return {string}
     */
    IfLogin:state =>{
        return state.ifLogin
    },

    GetToken:state => {
        return state.Token
    }
}