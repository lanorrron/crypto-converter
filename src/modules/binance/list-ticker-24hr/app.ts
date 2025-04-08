import {APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import axios from "axios";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
    try {
        const baseUrl = process.env.BINANCE_BASE_URL;

        const response = await axios.get(`${baseUrl}/api/v3/ticker/24hr`);
        return{
            statusCode: 200,
            body: JSON.stringify({
                data:response.data
            })
        }
    } catch (err) {
        console.log(err);
        return{
            statusCode:500,
            body: JSON.stringify({
                message: "some erorr happened"
            })
        }
    }
}