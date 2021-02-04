import { GistItem } from "./gistItem";
import { fetchGistsForUser } from "./api";

function Main() {
  const [text, setText] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [gists, setGists] = React.useState([]);
  const [isBottom, setIsBottom] = React.useState(false);
  const [page, setPage] = React.useState(0);

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isBottom) {
      fetchGists()
    }
  }, [isBottom]);

  const fetchGists = React.useCallback(
    () => {
      if (searching) return;
      setSearching(true);
      return fetchGistsForUser(text, page + 1)
        .then((arr) => setGists(gists.concat(arr)))
        .then(() => setSearching(false))
        .then(() => setPage(page + 1))
        .then(() => setIsBottom(false));
    },
    [searching, text, page]
  );

  return (
    <div id="container">
      <div id="searchBar">
        <input
          type="text"
          id="searchField"
          placeholder="Username"
          value={text}
          onChange={({ target: { value } }) =>
            setText(value.split(" ").join(""))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchGistsForUser(text).then(setGists);
            }
          }}
          style={{ borderColor: "#aaa" }}
        />
        <input
          type="button"
          disabled={searching}
          onClick={fetchGists}
          style={{ width: 70 }}
          value="Search"
        />
      </div>
      {gists.map((gist) => (
        <GistItem {...gist} key={gist.id} />
      ))}
    </div>
  );
}

export default Main;
