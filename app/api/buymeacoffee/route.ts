export async function POST(request: Request) {
  try {
    const text = await request.text();
    // Process the webhook payload
    console.log(text);
  } catch (error) {
    console.log(error);
    return new Response(`Webhook error`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
