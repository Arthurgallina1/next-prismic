import { useRouter } from "next/router";
import PrismicDOM from "prismic-dom";
import { client } from "../../lib/prismic";

export default function Product({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando</p>;
    }
    return (
        <div>
            <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

            <div
                dangerouslySetInnerHTML={{
                    __html: PrismicDOM.RichText.asHtml(
                        product.data.description
                    ),
                }}
            ></div>
            <img src={product.data.thumbnail.url} width='300' alt='' />
            <p>
                <strong>Price:</strong>
                {product.data.price}{" "}
            </p>
        </div>
    );
}

//fallback true => se não encontrar busca dnv na API e gera página estatica
export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const { slug } = context.params;

    const product = await client().getByUID("product", String(slug), {});

    return {
        props: {
            product,
        },
        revalidate: 15,
    };
};
