import { Convert, } from "@binance/convert";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SecretManager } from "../../../../utils/secretManager";

/*
 interface BinanceConvertQuoteParams {
    fromAsset: string;
    toAsset: string;
    fromAmount?: number;
    toAmount?: number;
    walletType?: "SPOT" | "FUNDING"; // default is SPOT
    validTime?: "10s" | "30s" | "1m"; // default is 10s
    recvWindow?: number;
    timestamp: number;
}
*/


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const binanceSecretManager = SecretManager.getInstance()
    const binanceSecret = await binanceSecretManager.getSecret<{ binance_api_key: string, binance_api_secret: string }>(process.env.BINANCE_SECRET_NAME!)

    const binance = new Convert({
        configurationRestAPI: {
            apiKey: binanceSecret.binance_api_key,
            apiSecret: binanceSecret.binance_api_secret,
        },
    });

    try {
        const query = event.queryStringParameters || {};
        const { fromAsset, toAsset, fromAmount } = query;
        if (!fromAsset || !toAsset || !fromAmount) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: " Missing required query parameters." }),
            }
        }

        const response = await binance.restAPI.sendQuoteRequest({
            fromAsset,
            toAsset,
            fromAmount: Number(fromAmount)
        });
        const data = await response.data();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "some erorr happened"
            })
        }
    }
}