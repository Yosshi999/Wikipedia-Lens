// See https://www.mediawiki.org/wiki/API:REST_API

const version = "0.0"

const templateHeader = {
  "Api-User-Agent": `WikipediaLens/${version} (https://github.com/Yosshi999/Wikipedia-Lens)`
};
const actionURL = "https://ja.wikipedia.org/w/api.php";
const restURL = "https://ja.wikipedia.org/w/rest.php/v1";

// https://www.mediawiki.org/wiki/API:REST_API/Reference#Search_result_object
type RestSearchResult = {
  id: number,  // Page identifier
  key: string,  // Page title in URL-friendly format
  title: string,  // Page title in reading-friendly format
  excerpt: string,  // A few lines giving a sample of page content with search terms highlighted with <span class=\"searchmatch\"> tags
  matched_title?: string | null,  // The title of the page redirected from, if the search term originally matched a redirect page or null if search term did not match a redirect page.
  description: string | null,  // Short summary of the page topic based on the corresponding entry on Wikidata or null if no entry exists
  thumbnail: null | {
    mimetype: string,
    size: number | null,
    width: number | null,
    height: number | null,
    duration: number | null,
    url: string,
  },  // Information about the thumbnail image for the page or null if no thumbnail exists.
}

export type SearchResultItem = {
  heading: string,
  abst: string,
  key: string
};

export const searchByName = async (name: string): Promise<SearchResultItem[]> => {
  const query = new URLSearchParams({
    q: name,
    limit: "5"
  });

  const data: {pages: RestSearchResult[]} = await fetch(restURL + "/search/title?" + query, {
    method: "GET",
    headers: new Headers(templateHeader)
  }).then((response) => response.json());

  return data.pages.map(({key, title, description}) => {
    return {
      key,
      heading: title,
      abst: (description === null) ? "" : description,
    };
  });
};

export const getLatestRevision = async (name: string) => {
  const query = new URLSearchParams({
    origin: "*",
    action: "query",
    prop: "revisions",
    titles: name,
    rvprop: "content|timestamp|user|sha1|comment",
    rvslots: "main",
    formatversion: "2",
    format: "json"
  });

  const data = await fetch(actionURL + "?" + query, {
    method: "GET",
    headers: new Headers(templateHeader)
  }).then((response) => (response.json()));

  return data;
};