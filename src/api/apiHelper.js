import request from "./ajax";
import qs from "qs";
import { Toast } from 'vant'

export default function requestHelper(url, method, data, openJsonParams) {
    return new Promise((resolve, reject) => {
        const transformRequest = openJsonParams ? [
            function(data, headers) {
                headers["Content-Type"] = "application/json";
                return data;
            }
        ] : null;
        let params;
        switch (method) {
            case "get":
                params = {
                    url: url,
                    method: "get",
                    params: data
                };
                break;
            case "post":
                params = {
                    url: url,
                    method: "post",
                    data: openJsonParams ? JSON.stringify(data) : qs.stringify(data),
                    transformRequest: transformRequest
                };
                break;
            case "put":
                params = openJsonParams ? {
                    url: url,
                    method: "put",
                    data: JSON.stringify(data),
                    transformRequest: transformRequest
                } : { url: url, method: method, params: data };
                break;
            case "delete":
                params = openJsonParams ? {
                    url: url,
                    method: "delete",
                    data: JSON.stringify(data),
                    transformRequest: transformRequest
                } : { url: url, method: method, params: data };
                break;
        }
        request(params).then(response => {
            Toast.clear();
            resolve(response);
        }).catch(error => {
            Toast.clear();
            reject(error);
        });
    });
}