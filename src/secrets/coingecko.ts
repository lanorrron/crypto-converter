import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

interface MySecret {
    API_KEY: string
}

let cachedSecret: MySecret | null = null;
const secretName = "coingecko_secret"

const client = new SecretsManagerClient({
    region: "us-east-2"
})

export async function getSecret(secretName: string): Promise<MySecret> {
    if (cachedSecret) return cachedSecret;
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName
            })
        );
        
        if(!response.SecretString){
            throw new Error("No SecretString found in the response");
        }

        cachedSecret = JSON.parse(response.SecretString) as MySecret;
        return cachedSecret;
    } catch (err) {
        console.log("Error fetching secret:", err);
        throw err;
    }
}