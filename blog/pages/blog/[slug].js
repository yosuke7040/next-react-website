import { getAllSlugs, getPostBySlug } from "lib/api";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import Image from "next/legacy/image";
import ConvertBody from "@/components/convert-body";
import PostCategories from "@/components/post-categories";
import { extractText } from "@/lib/extract-text";
import Meta from "@/components/meta";
import { eyecatchLocal } from "lib/constants";
import { getPlaiceholder } from "plaiceholder";
import { getImageBuffer } from "@/lib/getImageBuffer";
import { prevNextPost } from "@/lib/prev-next-post";
import Pagination from "@/components/pagination";

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            key={eyecatch.url}
            src={eyecatch.url}
            alt=""
            layout="responsive"
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
        <div>
          {prevPost.title} {prevPost.slug}
        </div>
        <div>
          {nextPost.title} {nextPost.slug}
        </div>
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs();

  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const post = await getPostBySlug(slug);

  const description = extractText(post.content);

  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const imageBuffer = await getImageBuffer(eyecatch.url);
  const { base64 } = await getPlaiceholder(imageBuffer);
  eyecatch.blurDataURL = base64;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
    },
  };
}
