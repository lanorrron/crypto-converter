import { APIGatewayProxyResult } from "aws-lambda";
import { json } from "stream/consumers";

type Header = {
    [header: string]: boolean | number | string;
};
const defaultHeaders: Header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
}


export class HttpResponse {

    static Success<T = any>(body: T, statusCode?: number, headers?: Header): APIGatewayProxyResult {
        return {
            statusCode: statusCode ?? 200,
            headers: {
                ...headers,
                ...defaultHeaders
            },
            body: typeof body === "string" ? body : JSON.stringify(body),
        };
    }

    static NotFound(message: string, statusCode?: number, headers?: Header): APIGatewayProxyResult {
        return {
            statusCode: statusCode ?? 404,
            headers: {
                ...headers,
                ...defaultHeaders
            },
            body: JSON.stringify({
                success: false,
                message: message
            }),
        };
    }
    static ExpiredToken(message: string, statusCode?: number, headers?: Header): APIGatewayProxyResult {
        return {
            statusCode: statusCode ?? 401,
            headers: {
                ...headers,
                ...defaultHeaders,
            },
            body: JSON.stringify({
                success: false,
                message: message,
            }),
        };
    }

    static BadRequest(message: string, statusCode?: number, headers?: Header): APIGatewayProxyResult {
        return {
            statusCode: statusCode ?? 400,
            headers: {
                ...headers,
                ...defaultHeaders,
            },
            body: JSON.stringify({
                success: false,
                message: message,
            }),
        }
    }

    static InternalError(message: string, statusCode?: number, headers?: Header): APIGatewayProxyResult {
        return {
            statusCode: statusCode ?? 500,
            headers: {
                ...headers,
                ...defaultHeaders
            },
            body: JSON.stringify({
                success: false,
                message: message
            }),
        };
    }


}