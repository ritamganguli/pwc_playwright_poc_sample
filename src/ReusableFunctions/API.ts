import { request } from '@playwright/test';
import Report from './Report'
import { Agent } from "undici"
import crypto from 'crypto';
import https from 'https';
import axios, { AxiosResponse } from 'axios';
export default class ReusableFunctions {
    reqObject = {
        statusCode: 0,
        responseBody: {

        }
    };

    /**
     * name
     */
    public async Getrequest(uri: string) {
        const report = new Report();
        try {
            const response = await fetch(uri, {
                headers: {
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE="
                },
                mode: "cors",

            });
            this.reqObject.statusCode = await response.status;
            this.reqObject.responseBody = await response.json();
            await report.LogReport(JSON.stringify(this.reqObject.responseBody), "info", "");
            console.log(JSON.stringify(this.reqObject.responseBody))
        } catch (error) {
            console.log("error at Getrequest", error.message);
            await report.LogReport(error, "fail", "");
        }
        return this.reqObject;

    }


    public async GerRec(uri: string): Promise<AxiosResponse> {
        const report = new Report();
        var response
        try {
            response = await axios.get(uri, {
                headers: {
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                    'Content-Type': 'application/json',
                },
                httpAgent: new https.Agent({

                    //secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
                    rejectUnauthorized: false,
                }),

            });
            console.log(response.data);
            await report.LogReport(response.data, "info", "");
            return response;
        } catch (error) {
            console.error(error.message);
            await report.LogReport(error.message, "fail", "");
            return response;
        }
    }

    public async GerRe(uri: string): Promise<AxiosResponse> {
        const report = new Report();
        var response
        await report.LogReport("Get Request Url:" + uri, "info", "");
        const instance = axios.create({
            httpsAgent: new https.Agent({ rejectUnauthorized: false, secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT })
        });
        try {
            response = await instance.get(uri, {
                headers: {
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                    'Content-Type': 'application/json',
                },


            });
            //console.log(response.data);
            await report.LogReport("Status Code:" + response.status, "info", "");
            return response;
        } catch (error) {
            console.error(error.message);
            await report.LogReport(error.message, "fail", "");
            return response;
        }
    }

    public async PlwPostRequest(uri: string, body: object): Promise<any> {
        const report = new Report();
        var response
        let respBody
        try {
            response = await (await request.newContext()).post(uri, {
                data: body,
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                },

            })
            respBody = await response.json();
            await report.LogReport("Status Code:" + response.status().toString(), "pass", "");
            //await report.LogReport(respBody.count, "pass", "");
            return respBody

        } catch (error) {
            await report.LogReport("Status Code:" + response.status().toString(), "fail", "");
            return respBody
        }
    }
    public async PlwGetRequest(uri: string): Promise<any> {
        const report = new Report();
        var response
        let respBody
        try {
            response = await (await request.newContext()).get(uri, {

                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                },

            })
            respBody = await response.json();
            await report.LogReport("Status Code:" + response.status().toString(), "pass", "");
            //await report.LogReport(respBody.count, "pass", "");
            return respBody

        } catch (error) {
            await report.LogReport("Status Code:" + response.status().toString(), "fail", "");
            return respBody
        }
    }

    public async PlwPatchRequest(uri: string, body: object) {
        const report = new Report();
        var response
        try {
            response = await (await request.newContext()).patch(uri, {
                data: body,
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                },

            })
            let respBody = await response.json();
            await report.LogReport("Status Code:" + response.status().toString(), "pass", "");
            //await report.LogReport(respBody.count, "pass", "");

        } catch (error) {
            await report.LogReport("Status Code:" + response.status().toString(), "fail", "");
        }
    }

    public async PatchRequest(uri: string, body: string): Promise<AxiosResponse> {
        const report = new Report();
        var response
        console.log("Url:" + uri);
        const instance = axios.create({
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        try {
            response = await instance.patch(uri, {
                headers: {
                    "Authorization": "Basic OnhsdWlpeWwzaG1sNDQ1cm5iZXdydzdwdGhpbXRzZHpnbGZ5MmFmYzNrbTU1bmg0enU3NXE=",
                    'Content-Type': 'application/json',
                },
                httpAgent: new https.Agent({

                    //secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
                    //rejectUnauthorized: false,
                }),
                data: body

            });
            console.log(response.data);
            await report.LogReport(response.data, "info", "");
            return response;
        } catch (error) {
            console.error(error.message);
            await report.LogReport(error.message, "fail", "");
            return response;
        }
    }
}