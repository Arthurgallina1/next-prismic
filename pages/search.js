import { useState } from "react";
import { Router } from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { client } from "./lib/prismic";

export default function Search({ searchResults }) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(search)}`);

        setSearch("");
    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit'> Search </button>
            </form>
            <ul>
                {searchResults.map((product) => (
                    <li key={product.id}>
                        <Link href={`/catalog/products/${product.uid}`}>
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

export const getServerSideProps = async (ctx) => {
    const { q } = ctx.query;

    if (!q) {
        return {
            props: {
                searchResults: [],
            },
        };
    }

    const searchResults = await client().query([
        Prismic.Predicates.at("document.type", "product"),
        Prismic.Predicates.fulltext("my.product.title", String(q)),
    ]);
    return {
        props: {
            searchResults: searchResults.results,
        },
    };
};
