import "server-only";

async function requestHandler(request) {
  const { searchParams } = new URL(request.url);

  const url = new URL(`https://geocoding-api.open-meteo.com/v1/search`);
  url.search = new URLSearchParams(searchParams);
  const res = await fetch(url);

  const data = await res.json();

  return Response.json(data);
}

export { requestHandler as GET };
