export const fetchForkersForGist = (gistId) =>
  fetch(`https://api.github.com/gists/${encodeURIComponent(gistId)}/forks`)
    .then((res) => res.json()).then()

export const fetchGistsForUser = (username) =>
  fetch(`https://api.github.com/users/${encodeURIComponent(username)}/gists`)
    .then((res) => res.json())
    .then((gists) =>
      gists.map(({ id, files, html_url }) => ({
        name: Object.keys(files)[0],
        languages: [
          ...new Set(Object.keys(files).map((file) => files[file].language)),
        ],
        id,
        gistUrl: html_url
      }))
    );