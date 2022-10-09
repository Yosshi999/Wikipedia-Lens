const version = "0.0"

const templateHeader = {
  "Api-User-Agent": `WikipediaLens/${version} (https://github.com/Yosshi999/Wikipedia-Lens)`
};
const targetURL = "https://ja.wikipedia.org/w/api.php";

export const searchByName = async (name: string) => {
  const query = new URLSearchParams({
    origin: "*",
    action: "opensearch",
    search: name,
    limit: "5",
    namespace: "0",
    format: "json"
  });

  const data = await fetch(targetURL + "?" + query, {
    method: "GET",
    headers: new Headers(templateHeader)
  }).then((response) => (response.json()));

  return data;
};