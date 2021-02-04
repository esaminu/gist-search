
export const UserTag = ({ avatar_url, login, profileUrl }) => (
  <a className="userBadge" href={profileUrl}>
    <img className="userBadgeLogo" src={avatar_url} />
    <span>
      <b>{login}</b>
    </span>
  </a>
);
