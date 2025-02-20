import { CircularProgress } from "@mui/material";
import { Form } from "react-router-dom";
import type { Profile } from "./profileUtils";
import type { ProfileVerb } from "./ProfileCreateEdit";

interface ProfileFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
  isLoading: boolean;
}

export function ProfileForm({
  handleSubmit,
  verb,
  initialProfile,
  isLoading,
}: Readonly<ProfileFormProps>) {
  return (
    <Form id={`profile-${verb}`} onSubmit={handleSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="First Name"
          type="text"
          name="first_name"
          defaultValue={initialProfile?.first_name}
          required
        />
        <input
          placeholder="Last Name"
          type="text"
          name="last_name"
          defaultValue={initialProfile?.last_name}
          required
        />
        {/*<input type="hidden" name="id">{id}</input>*/}
      </p>
      <p>
        <label>
          <span>Phone</span>
          <input
            placeholder="(555) 555-0199"
            type="text"
            name="phone"
            defaultValue={initialProfile?.phone}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            placeholder="replace_this@fictitious.example"
            type="text"
            name="email"
            defaultValue={initialProfile?.email}
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Address</span>
          <input
            placeholder="221B Replace Me"
            type="text"
            name="address"
            defaultValue={initialProfile?.address}
            required
          />
        </label>
        <label>
          <span>City</span>
          <input
            placeholder="Faketown"
            type="text"
            name="city"
            defaultValue={initialProfile?.city}
            required
          />
        </label>
        <br />
        <label>
          <span>State</span>
          <input
            placeholder="ZZ"
            type="text"
            name="state"
            defaultValue={initialProfile?.state}
          />
        </label>
        <label>
          <span>Zip</span>
          <input
            placeholder="11111"
            type="text"
            name="zip"
            defaultValue={initialProfile?.zip}
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Photo</span>
          <input
            placeholder="fakeurl.fictitious.example/photo.jpg"
            type="text"
            name="photo"
            defaultValue={initialProfile?.photo}
          />
        </label>
      </p>
      <p>
        <label>
          <span>Notes</span>
          <textarea
            placeholder="Your freeform notes go here"
            name="notes"
            defaultValue={initialProfile?.notes}
          />
        </label>
      </p>
      <p>
        {!isLoading ? (
          <button type="submit" style={{ width: "8em", height: "2em" }}>
            Submit
          </button>
        ) : (
          "Submitting"
        )}
        <br />
        {isLoading && <CircularProgress size={24} />}
      </p>
    </Form>
  );
}
