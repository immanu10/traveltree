export default function PostPage({ params }: { params: { id: string } }) {
  return <h1>Post - {params.id}</h1>;
}
