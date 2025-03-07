import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import isURL from "validator/lib/isURL";
import { ValidationError } from "yup";
import RTKQueryError from "../util/RTKQueryError";
import { UseCreateProfileMutation, UseEditProfileMutation } from "./profileApi";
import { ProfileForm } from "./ProfileForm";
import type { Profile, ProfileNoId } from "./profileUtils";
import { profileNoIdSchema } from "./schema";
import { capitalize } from "@mui/material";

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

export type ProfileFormErrorInfo = {
  path: string | undefined;
  message: string;
};

export function ProfileCreateEdit({
  mutation,
  verb,
  initialProfile,
  id,
}: Readonly<ProfileCreateEditProps>) {
  const navigate = useNavigate();
  const [formErrorInfo, setFormErrorInfo] =
    useState<ProfileFormErrorInfo | null>(null);

  // pulling mutation[0] inside of the verb below instead of here check helps it typecheck
  const { isLoading, isError, error } = mutation[1];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // First validate the shape (redundant but I wanna show off)
    let profileNoId: ProfileNoId;
    try {
      profileNoId = await profileNoIdSchema.validate(
        Object.fromEntries(formData.entries())
      );
      // Then validate some string rules
      if (!isEmail(profileNoId.email)) {
        throw new ValidationError("Invalid email address", undefined, "email");
      }
      if (profileNoId.photo && !isURL(profileNoId.photo)) {
        throw new ValidationError("Invalid URL", undefined, "photo");
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        setFormErrorInfo({
          path: e.path,
          message: capitalize(e.message).replaceAll("_", " "),
        });
        return;
      }
      throw e;
    }

    let result;
    if (verb === "create") {
      result = await mutation[0](profileNoId);
    } else {
      result = await mutation[0]({ id: id, profile: profileNoId });
    }

    if (!("error" in result)) {
      // TODO: docs suggest there's some more idiomatic way to do this than useNavigate
      navigate(id ? `/profile/${id}` : "/");
    }
  };

  if (isError) {
    return <RTKQueryError error={error} operation={`profile ${verb}`} />;
  } else {
    // isUninitialized || isLoading
    return (
      <ProfileForm
        handleSubmit={handleSubmit}
        initialProfile={initialProfile}
        isLoading={isLoading}
        errorInfo={formErrorInfo}
      />
    );
  }
}

export type { ProfileVerb };
