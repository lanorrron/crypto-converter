import { Convert, } from "@binance/convert";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

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

const binance = new Convert({
    configurationRestAPI: {
        apiKey: process.env.BINANCE_API_KEY!,
        apiSecret: process.env.BINANCE_API_SECRET!,
    },
});

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>=>{
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
            fromAmount: Number(fromAmount),
        });

        return{
            statusCode: 200,
            body: JSON.stringify(response.data)
        };

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