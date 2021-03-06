// http://10.247.23.176:3000/#/b?from=csmp&menu=open
// window.location.hash = "#/b?from=csmp&menu=open"
// window.location.search = ""
// http://10.247.23.176:3000/?from=csmp&menu=open#/b
// window.location.hash = "#/b"
// window.location.search = "?from=csmp&menu=open"
export function getValueInUrl(name: string, url?: string) {
  if (!url) {
    url = window.location.href;
  }
  let searchIndex = url.indexOf('?');
  let hashIndex = url.indexOf('#');
  // 应取?之后#之前
  if (searchIndex > -1) {
    let search = '';
    if (hashIndex > searchIndex) {
      search = url.substring(searchIndex, hashIndex);
    } else {
      search = url.substring(searchIndex);
    }
    return getValueInSearch(name, search);
  } else {
    return '';
  }
}

export function getValueInSearch(name: string, search: string) {
  if (!search) return;
  const searchParams = search[0] === '?' ? new URLSearchParams(search.substring(1)) : new URLSearchParams(search);
  return searchParams.get(name);
}
