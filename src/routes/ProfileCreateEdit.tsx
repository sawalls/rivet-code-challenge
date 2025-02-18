import React from 'react';
import { Form, useNavigate, useParams } from "react-router-dom";
import { useCreateProfileMutation, useEditProfileMutation, useGetProfileByIdQuery } from "../features/profile/profileApi";
import { type Profile } from '../features/profile/profileUtils';
import RTKQueryWrapper from '../features/util/RTKQueryWrapper';
import RTKQueryError from '../features/util/RTKQueryError';
import { CircularProgress } from '@mui/material';

export const ProfileCreate = () => {
  return <ProfileCreateEdit mutation={useCreateProfileMutation()} verb="create" />;
}

export const ProfileEdit = () => {
  const mutation = useEditProfileMutation();
  const { id: profileId } = useParams();
  const result = useGetProfileByIdQuery(profileId);

  return <RTKQueryWrapper useQueryHookResult={result} operation="get profile">
    <ProfileCreateEdit mutation={mutation} verb="edit" initialProfile={result.data} />
  </RTKQueryWrapper>;
}

type ProfileVerb = 'create' | 'edit';

interface ProfileCreateEditProps {
  mutation: ReturnType<typeof useCreateProfileMutation> | ReturnType<typeof useEditProfileMutation>;
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
}

function ProfileCreateEdit({ mutation, verb, initialProfile }: Readonly<ProfileCreateEditProps>) {
  const { id: profileId } = useParams();
  const [mutateProfile, { isLoading, isError, error }] = mutation;
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

  if (isError) {
    return <RTKQueryError error={error} operation={`profile ${verb}`} />;
  } else {
    // isUninitialized || isLoading
    return <ProfileForm handleSubmit={handleSubmit} verb={verb} initialProfile={initialProfile} isLoading={isLoading} />;
  }
}

interface ProfileFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
  isLoading: boolean;
}

function ProfileForm({ handleSubmit, verb, initialProfile, isLoading }: Readonly<ProfileFormProps>) {
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
          <input placeholder="Faketown" type="text" name="city" defaultValue={initialProfile?.city} required />
        </label>
        <br />
        <label>
          <span>State</span>
          <input placeholder="ZZ" type="text" name="state" defaultValue={initialProfile?.state} required />
        </label>
        <label>
          <span>Zip</span>
          <input placeholder="11111" type="text" name="zip" defaultValue={initialProfile?.zip} required />
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
            defaultValue={initialProfile?.notes}
            required
          />
        </label>
      </p>
      <p>
        {!isLoading ? <button type="submit" style={{ width: '8em', height: '2em' }}>Submit</button> : 'Submitting'}
        <br />
        {isLoading && (
          <CircularProgress
            size={24}
          />
        )}
      </p>
    </Form>
  );
}
