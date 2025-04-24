import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { SecretManager } from '../../utils/secretManager';
import { HttpResponse } from '../../shared/http/httpResponse';

// list top 10 coins by marketcap
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const baseUrl = process.env.COINGECKO_BASE_URL;
    const coinGeckoSecreName = process.env.COINGECKO_SECRET_NAME;

    try {
        if (!coinGeckoSecreName) throw new Error('CoinGecko secretName not found');

        const secretManager = SecretManager.getInstance();
        const secret = await secretManager.getSecret<{ api_key_coingecko: string }>(coinGeckoSecreName);

        const url = `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10`;
        const response: any = await axios.get(url, {
            headers: {
                Accept: 'application/json',
                'x-cg-demo-api-key': secret.api_key_coingecko,
            },
        });
        return HttpResponse.Success(response.data);
    } catch (err) {
        console.log(err);
        return HttpResponse.InternalError('Some error happened');
    }
};
