import {
    Form,
    useParams,
} from "react-router-dom";

// TODO: parameterize this with HTMLFormMethod or something to get POST/PUT in same component
function ProfileForm () {
    const { id } = useParams();
    return (
        <Form method="put" id="profile-form">
        {/*<Form method="post" id="profile-form">*/}
            <p>
                <span>Name</span>
                <input placeholder="First Name" type="text" name="first_name" required />
                <input placeholder="Last Name" type="text" name="last_name" required />
                {/*<input type="hidden" name="id">{id}</input>*/}
            </p>
            <p>
                <label>
                    <span>Phone</span>
                    <input placeholder="(555) 555-0199" type="text" name="phone" required />
                </label>
                <label>
                    <span>Email</span>
                    <input placeholder="replace_this@fictitious.example" type="text" name="email" required/>
                </label>
            </p>
            <p>
                <label>
                    <span>Address</span>
                    <input placeholder="221B Replace Me" type="text" name="address" required/>
                </label>
                <label>
                    <span>City</span>
                    <input placeholder="Faketown" type="text" name="city" required/>
                </label>
                <br />
                <label>
                    <span>State</span>
                    <input placeholder="ZZ" type="text" name="state" required/>
                </label>
                <label>
                    <span>Zip</span>
                    <input placeholder="11111" type="text" name="zip" required/>
                </label>
            </p>
            <p>
                <label>
                    <span>Photo</span>
                    <input placeholder="fakeurl.fictitious.example/photo.jpg" type="text" name="photo" required/>
                </label>
            </p>
            <p>
                <label>
                    <span>Notes</span>
                    <textarea placeholder="fakeurl.fictitious.example/photo.jpg" name="notes" required/>
                </label>
            </p>
            <p>
                {/*<button type="submit">Create</button>*/}
                <button type="submit">Update</button>
            </p>
        </Form>
    );
}

export default ProfileForm;