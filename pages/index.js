import Head from "next/head";
import Link from "next/link";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { client } from "./lib/prismic";

export default function Home({ recommendedProducts }) {
    return (
        <div>
            <ul>
                {recommendedProducts.map((product) => (
                    <li key={product.id}>
                        <Link href={`/catalog/categories/${product.uid}`}>
                            <a>
                                {PrismicDOM.RichText.asText(product.data.title)}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getServerSideProps = async () => {
    const recommendedProducts = await client().query([
        Prismic.Predicates.at("document.type", "product"),
    ]);

    return {
        props: {
            recommendedProducts: recommendedProducts.results,
        },
    };
};
