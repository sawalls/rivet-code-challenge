import React from 'react';
import { Form, useNavigate, useParams } from "react-router-dom";
import { useCreateProfileMutation, useEditProfileMutation } from "../features/profile/profileApi";

// TODO: error handling for
// - network to create request fails

export const ProfileCreate = () => {
  return <ProfileCreateEdit mutation={useCreateProfileMutation()} verb="create" />;
}

export const ProfileEdit = () => {
  return <ProfileCreateEdit mutation={useEditProfileMutation()} verb="edit" />;
}

function ProfileCreateEdit({mutation, verb} : { mutation: ReturnType<typeof useCreateProfileMutation>, verb: 'create' | 'edit'}) {
  const { id: profileId } = useParams();
  const [mutateProfile, { isError, error }] = mutation;
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profile = Object.fromEntries(formData.entries());

    let result;
    if (verb === 'create') {
      result = await mutateProfile(profile);
    } else {
      result = await mutateProfile({ id: profileId, profile });
    }
    if (!("error" in result)) {
      navigate("/");
    }
  };

  if (isError && error) {
    // TODO: make this show up in a dismissable banner
    if ("status" in error) {
      const errMsg =
        "error" in error
          ? error.error
          : "have to give up because dunno what error.data is"; // TODO: uhh huh?
      return (
        <h1>
          Error during profile {verb}: {error.status} {errMsg}
        </h1>
      );
    } else {
      const errMsg = error.message;
      return <h1>Error during profile {verb}: {errMsg}</h1>;
    }
  } else {
    // isUninitialized || isLoading
    return <ProfileForm handleSubmit={handleSubmit} verb={verb} />;
  }
}

function ProfileForm({ handleSubmit, verb }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void , verb: 'create' | 'edit'}) {
  const capsVerb = verb.charAt(0).toUpperCase() + verb.slice(1);

  return (
    <Form id={`profile-${verb}`} onSubmit={handleSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="First Name"
          type="text"
          name="first_name"
          required
        />
        <input
          placeholder="Last Name"
          type="text"
          name="last_name"
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
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            placeholder="replace_this@fictitious.example"
            type="text"
            name="email"
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
            required
          />
        </label>
        <label>
          <span>City</span>
          <input placeholder="Faketown" type="text" name="city" required />
        </label>
        <br />
        <label>
          <span>State</span>
          <input placeholder="ZZ" type="text" name="state" required />
        </label>
        <label>
          <span>Zip</span>
          <input placeholder="11111" type="text" name="zip" required />
        </label>
      </p>
      <p>
        <label>
          <span>Photo</span>
          <input
            placeholder="fakeurl.fictitious.example/photo.jpg"
            type="text"
            name="photo"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Notes</span>
          <textarea
            placeholder="Your freeform notes go here"
            name="notes"
            required
          />
        </label>
      </p>
      <p>
        <button type="submit">{capsVerb}</button>
      </p>
    </Form>
  );
}
