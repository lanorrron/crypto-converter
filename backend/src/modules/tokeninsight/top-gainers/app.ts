import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { SecretManager } from '../../../utils/secretManager';
import { HttpResponse } from '../../../shared/http/httpResponse';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const baseUrl = process.env.TOKENINSIGHT_BASE_URL;
    const tokeninsightSecretName = process.env.TOKENINSIGHT_SECRET_NAME;
    const limitParam = event.queryStringParameters?.limit;
    const limit = limitParam && !isNaN(Number(limitParam)) ? Number(limitParam) : 10;

    try {
        if (!tokeninsightSecretName) {
            throw new Error('Tokeninsight secret not found');
        }
        const secretManager = SecretManager.getInstance();
        const secret = await secretManager.getSecret<{ tokeninsight_secret_key: string }>(tokeninsightSecretName);

        const url = `${baseUrl}/api/v1/coins/top-gainers`;
        const response = await axios.get(url, {
            headers: {
                TI_API_KEY: secret.tokeninsight_secret_key,
            },
        });
        const fullData = response.data?.data ?? [];
        const slicedData = fullData.slice(0, limit);

        return HttpResponse.Success(slicedData);
    } catch (error) {
        console.log(error);
        return HttpResponse.InternalError();
    }
};
