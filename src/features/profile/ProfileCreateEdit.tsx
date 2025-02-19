import { Navigate } from "react-router-dom";
import { useCreateProfileMutation, useEditProfileMutation } from "./profileApi";
import type { Profile, ProfileNoId } from "./profileUtils";
import RTKQueryError from "../util/RTKQueryError";
import { ProfileForm } from "./ProfileForm";
import { profileNoIdSchema } from "./schema";

type ProfileVerb = "create" | "edit";

interface ProfileCreateEditProps {
  handleSubmitForm: (profile: ProfileNoId) => Promise<void>;
  result: ReturnType<
    typeof useCreateProfileMutation | typeof useEditProfileMutation
  >[1];
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
}

export function ProfileCreateEdit({
  handleSubmitForm,
  result,
  verb,
  initialProfile,
}: Readonly<ProfileCreateEditProps>) {
  const { isLoading, isSuccess, isError, error, data } = result;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileNoId = await profileNoIdSchema.validate(
      Object.fromEntries(formData.entries())
    );

    await handleSubmitForm(profileNoId);
  };

  if (isSuccess) {
    // TODO: stop relying on Navigate kludge
    return <Navigate to={`/profile/${data.id}`} />;
  } else if (isError) {
    return <RTKQueryError error={error} operation={`profile ${verb}`} />;
  } else {
    // isUninitialized || isLoading
    return (
      <ProfileForm
        handleSubmit={handleSubmit}
        verb={verb}
        initialProfile={initialProfile}
        isLoading={isLoading}
      />
    );
  }
}

export type { ProfileVerb };
