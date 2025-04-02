import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

// list top 10 coins by marketcap

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
        const response = await axios.get(url,{
            headers:{
                'Accept': 'application/json',
                'x-cg-demo-api-key':'|'
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                response,
            }),
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
}