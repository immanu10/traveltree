export default function Page({ params }: { params: { username: string } }) {
  console.log(params.username);

  return <h1>{params.username} UserName page!</h1>;
}
