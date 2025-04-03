import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import { getSecret } from "../secrets/coingecko";

// list top 10 coins by marketcap

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const baseUrl = process.env.COINGECKO_BASE_URL;

    try {
        const {API_KEY} = await getSecret();

        const url = `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10`
        const response:any = await axios.get(url,{
            headers:{
                'Accept': 'application/json',
                'x-cg-demo-api-key': API_KEY
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                data:response.data,
                apikey:API_KEY
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