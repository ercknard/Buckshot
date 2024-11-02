import Head from "next/head";

export function DefaultHead(props: { title?: string }) {
  const { title = " HOME " } = props;

  return (
    <Head>
      <title>{`CryptechTest | ${title}`}</title>

      <meta
        id="meta-description"
        name="description"
        content="CryptechTest SMP Server: Community-driven Minetest Game with endless possibilities. Join us and embark on a journey of creativity, collaboration, and adventure in our immersive world."
      />
      <meta
        name="keywords"
        content="Minetest, CryptechTest, Cryptocurrency, Play2earn, Voxelgame, TESTCoin, BTC, ETH, MRX, SEND, OHMC, SCC"
      />

      <meta id="og-title" property="og:title" content="CryptechTest" />
    </Head>
  );
}
