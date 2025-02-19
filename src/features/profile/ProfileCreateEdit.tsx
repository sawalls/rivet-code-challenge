import { useNavigate } from "react-router-dom";
import { useCreateProfileMutation, useEditProfileMutation } from "./profileApi";
import type { Profile } from "./profileUtils";
import RTKQueryError from "../util/RTKQueryError";
import { ProfileForm } from "./ProfileForm";

type ProfileVerb = 'create' | 'edit';

interface ProfileCreateEditProps {
  mutation: ReturnType<typeof useCreateProfileMutation> | ReturnType<typeof useEditProfileMutation>;
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
  id?: number;
}

export function ProfileCreateEdit({ mutation, verb, initialProfile, id }: Readonly<ProfileCreateEditProps>) {
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
      result = await mutateProfile({ id, profile });
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

export type { ProfileVerb };
