import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import { SecretManager } from "../../utils/secretManager";

// list top 10 coins by marketcap
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const baseUrl = process.env.COINGECKO_BASE_URL;
    const secreName = process.env.COINGECKO_SECRET_NAME;

    try {
        if(!secreName) throw new Error("SecretName not found")

        const test = SecretManager.getInstance();
        const secret = await test.getSecret<{api_key_coingecko:string}>(secreName)


        const url = `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10`
        const response:any = await axios.get(url,{
            headers:{
                'Accept': 'application/json',
                'x-cg-demo-api-key': secret.api_key_coingecko
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                data:response.data,
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