import { getPublicUrlData } from "@/services/public";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const ShortLinkPage = async ({ params }: Props) => {
  const { slug } = params;
  const { url } = await getPublicUrlData(slug);
  if (!url) {
    notFound();
  }

  return redirect(url.original_url!);
};

export default ShortLinkPage;
