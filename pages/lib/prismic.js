import Prismic from "prismic-javascript";

export const apiEndpoint = "https://nextcms.cdn.prismic.io/api/v2";

export const client = (req) => {
    const options = req ? { req } : null;
    return Prismic.client(apiEndpoint, options);
};
