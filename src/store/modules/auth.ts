import { jwtDecrypt,tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
    },
    loginStatus:'' as string
});

const getters = {
    getLoginStatus(state:any):string{
        return state.loginStatus;
    },
    getAuthData(state:any){
        return state.authData;
    },
    isTokenActive(state:any) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    },
};

    const actions = {
        async login({commit}:any,payload:any) {
            console.log(payload);
            const newPayload = {
                username:payload.username,
                password:payload.password
            }
            const response = await axios.post("http://localhost:8080/authenticate",newPayload)
            .catch(err => {
            console.log(err)
            })
            console.log(response)
            if(response && response.data){
                commit('saveTokenData', response.data);
                commit('setLoginStatus','success');
            }else{
                commit('setLoginStatus','failure')
            }
            
    },
};

  //state changer for state
    const mutations = {
    saveTokenData(state:any, data:any) {

        localStorage.setItem("access_token", JSON.stringify(data.jwt));
        localStorage.setItem("refresh_token", "");
        
        console.log("Local Storage Access Token:"+localStorage.getItem("access_token"))

        const jwtDecodedValue = jwtDecrypt(data.access_token);
        console.log(jwtDecodedValue)
        const newTokenData = {
            token: data.access_token,
            refreshToken: data.refresh_token,
            tokenExp: jwtDecodedValue.exp,
            userId: jwtDecodedValue.sub,
            userName: jwtDecodedValue.username,
        };
        state.authData = newTokenData; 
        console.log(state.authData)
        },
        setLoginStatus(state:any, value:any){
            state.loginStatus = value;
        }
};

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}