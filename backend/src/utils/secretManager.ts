import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export class SecretManager {
    private static instance: SecretManager;
    private cache: Record<string, unknown> = {};
    private client: SecretsManagerClient;

    private constructor() {
        const region = process.env.AWS_REGION || 'ap-south-1';
        this.client = new SecretsManagerClient({ region });
    }

    static getInstance(): SecretManager {
        return (this.instance ??= new SecretManager());
    }

    async getSecret<T = unknown>(secretName: string): Promise<T> {
        if (this.cache[secretName]) return this.cache[secretName] as T;

        try {
            const response = await this.client.send(new GetSecretValueCommand({ SecretId: secretName }));
            if (!response.SecretString) throw new Error(`No secretString found for ${secretName}`);

            this.cache[secretName] = JSON.parse(response.SecretString) as T;
        } catch (error) {
            const errorMessage = `Error fetching secret '${secretName}': ${error}`;
            console.log(errorMessage);
            throw new Error(errorMessage);
        }
        return this.cache[secretName] as T;
    }
}
