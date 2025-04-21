import { Convert } from '@binance/convert';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SecretManager } from '../../../../utils/secretManager';
import { HttpResponse } from '../../../../shared/http/httpResponse';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const binanceSecretManager = SecretManager.getInstance();
    const binanceSecret = await binanceSecretManager.getSecret<{ binance_api_key: string; binance_api_secret: string }>(
        process.env.BINANCE_SECRET_NAME!,
    );

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
            return HttpResponse.BadRequest('Missing required query parameters');
        }

        const response = await binance.restAPI.sendQuoteRequest({
            fromAsset,
            toAsset,
            fromAmount: Number(fromAmount),
        });
        const data = await response.data();
        return HttpResponse.Success(data);
    } catch (err: any) {
        console.log(err);
        if (err.name === 'BadRequestError') {
            return HttpResponse.BadRequest(err.message);
        }
        return HttpResponse.InternalError();
    }
};
