import { Link } from "react-router-dom";

// TODO: add typing here when it's added on to profileAPI
export function Profile({ profile }: { profile: any }) {
  const {
    id,
    first_name,
    last_name,
    phone,
    email,
    address,
    city,
    state,
    zip,
    photo,
    notes,
  } = profile;

  return (
    <div>
      <h2>
        {first_name} {last_name}
      </h2>
      <p>
        <Link to={`/profile/${id}/edit`}>Edit this profile</Link>
      </p>
      <img src={photo} alt="This profile's avatar" />
      <p>{address}</p>
      <p>
        {city} {state} {zip}
      </p>
      <p>
        Contact: {phone} {email}
      </p>
      <p>Notes: {notes}</p>
    </div>
  );
}
