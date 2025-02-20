import { useNavigate } from "react-router-dom";
import { UseCreateProfileMutation, UseEditProfileMutation } from "./profileApi";
import type { Profile, ProfileNoId } from "./profileUtils";
import RTKQueryError from "../util/RTKQueryError";
import { ProfileForm } from "./ProfileForm";
import { profileNoIdSchema } from "./schema";
import { isEmail } from "validator";
import isURL from "validator/lib/isURL";

// passing verb is technically redundant since you could check for id
// but it's way more readable and useble in practice
interface CreateSet {
  mutation: UseCreateProfileMutation;
  verb: "create";
  initialProfile?: undefined;
  id?: undefined;
}

interface EditSet {
  mutation: UseEditProfileMutation;
  verb: "edit";
  initialProfile: Profile;
  id: number;
}

type ProfileCreateEditProps = CreateSet | EditSet;

type ProfileVerb = ProfileCreateEditProps["verb"];

export function ProfileCreateEdit({
  mutation,
  verb,
  initialProfile,
  id,
}: Readonly<ProfileCreateEditProps>) {
  const navigate = useNavigate();

  // pulling mutation[0] inside of the verb below instead of here check helps it typecheck
  const { isLoading, isError, error } = mutation[1];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // First validate the shape (redundant but I wanna show off)
    const profileNoId: ProfileNoId = await profileNoIdSchema.validate(
      Object.fromEntries(formData.entries())
    );
    // Then validate some string rules
    if (!isEmail(profileNoId.email)) {
      throw new Error("Invalid email address");
    }
    if (!isURL(profileNoId.photo)) {
      throw new Error("Invalid photo URL");
    }

    let result;
    if (verb === "create") {
      result = await mutation[0](profileNoId);
    } else {
      result = await mutation[0]({ id: id, profile: profileNoId });
    }

    if (!("error" in result)) {
      // TODO: docs suggest there's some more idiomatic way to do this than useNavigate
      navigate("/profiles");
    }
  };

  if (isError) {
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
