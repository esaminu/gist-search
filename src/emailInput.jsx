import { GistItem } from './gistItem'
import { fetchGistsForUser } from "./validateEmail";

function Main() {
  const [text, setText] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [gists, setGists] = React.useState([]);

  const fetchGists = React.useCallback(() => {
    if (searching) return;
    setSearching(true);
    return fetchGistsForUser(text)
      .then((arr) => setGists(arr))
      .then(() => setSearching(false));
  }, [searching, text]);

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
