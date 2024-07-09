
export const environment = {
    production: true,
    authorization: {
        clientId: "spa-rfBBftZjqE0iI5RLvu4EalbbX",
        scope:"itwin-platform",
        redirectUri: "http://localhost:3000",
        postSignoutRedirectUri: "http://localhost:3000",
        responseType: "code",
        authority: "https://ims.bentley.com"
    },
};

export type IEnvironment = typeof environment;