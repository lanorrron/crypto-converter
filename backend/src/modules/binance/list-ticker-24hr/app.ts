import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { HttpResponse } from '../../../shared/http/httpResponse';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const baseUrl = process.env.BINANCE_BASE_URL;

        const response = await axios.get(`${baseUrl}/api/v3/ticker/24hr`);
        return HttpResponse.Success(response.data);
    } catch (err) {
        console.log(err);
        return HttpResponse.InternalError('Some error happened');
    }
};
