import { UserTag } from './userTag'
import { fetchForkersForGist } from "./api";

export const GistItem = ({ name, languages, id, gistUrl}) => {
    const [forkers, setForkers] = React.useState([]);
  
    React.useEffect(() => {
      fetchForkersForGist(id).then((forkers = []) =>
        setForkers(
          forkers.map(({ owner: { avatar_url, login, url } }) => ({
            login,
            avatar_url,
            profileUrl: url
          }))
        )
      );
    }, []);
  
    return (
      <div key={id}>
        <div className="gistItem" style={{ margin: "15px 0 15px 0" }}>
          <a href={gistUrl} className="gistItemSection" style={{ fontWeight: "bold" }}>
            {name}
          </a>
          <div className="gistItemSection">
            <b style={{ width: "100%" }}>Languages</b>
            {languages.map((language) => (
              <span className="languageTag" key={language}>{language}</span>
            ))}
          </div>
          {forkers && forkers.length ? (
            <div className="gistItemSection">
              <b style={{ width: "100%" }}>Recent Forkers</b>
              {forkers.slice(0,3).map(({ login, avatar_url, profileUrl }, i) => (
                <UserTag login={login} avatar_url={avatar_url} key={avatar_url + i} profileUrl={profileUrl} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  };