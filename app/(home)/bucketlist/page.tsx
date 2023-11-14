export default function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  return <h1>BucketList - {searchParams.status}</h1>;
}
