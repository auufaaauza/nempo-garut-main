import VerifyEmailClient from "@/components/auth/VerifyEmailClient";

interface Props {
  params: { id: string; hash: string }
  searchParams: { [key: string]: string }
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return <VerifyEmailClient params={resolvedParams} searchParams={resolvedSearchParams} />
}

