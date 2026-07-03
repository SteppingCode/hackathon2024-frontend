import axios from "axios";
import { addNotify } from "./notify.svelte";
import { toast } from "svelte-sonner";


export const api_base = 'https://hack2024-back.vladyalk.ru';

export async function execute({method = 'get', path = '/', secure = true, params = null, data = null}={}){
    let headers = {}
    
    if(params == null){
        headers['Content-Type'] = 'application/json';
    }
    if(secure){
        let sess = "Bearer "+String(localStorage.getItem("Authorization"));
        let auth = null;
        if(sess){
            auth = sess
        }else{
            auth = "unauthed"   
        }

        headers['Authorization'] = auth;
    }

    // @ts-ignore
    return await new Promise(resolve => axios({
        url: `${api_base}${path}`,
        method: method,
        params: params,
        headers: headers,
        data: data,
    }).then(function (response) { 
            if(response.data.detail){
                addNotify({
                    code: response.status, 
                    text: response.data.detail
                });
            }        
            resolve(response.data)
        }).catch(function (error){
            if(error.response){
                //from back
                console.log(`ERROR: ${error.response.code}`);
                if(error.response.data){
                    console.log(error.response.data.detail);
                    if (error.response.status == 422 && typeof(error.response.data.detail) == "object"){
                        error.response.data.detail = "Произошла ошибка при проверке введенных Вами данных.";
                    }                 

                    addNotify({
                        code: error.response.status, 
                        text: error.response.data.detail
                    });
                    resolve(false);
                }
            }else{
                //sgorel server
                console.log("ERROR: unexcepted");
                // toast.error("Произошла ошибка сервера! Попробуйте позже.")
                resolve(false);
            }
        }));
}