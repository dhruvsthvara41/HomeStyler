import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../home-components/ui/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()


  
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (file) {
        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          null, // Optional: You can track upload progress here
          (error) => {
            // Handle unsuccessful uploads
            toast.error(error.message);
            setLoading(false);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadUrl,
            });
            setLoading(false);
            toast.success("Account created successfully!");
            navigate('/login');  // Navigate to login page after successful signup
          }
        );
      } else {
        // No file selected, just update profile without photo
        await updateProfile(user, {
          displayName: username,
        });
  
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: username,
          email,
        });
  
        setLoading(false);
        toast.success("Account created successfully!");
        navigate('/login');  // Navigate to login page after successful signup
      }
    } catch (error) {
      // Display detailed error information
      toast.error(`Error: ${error.message}`);
      console.error("Signup Error: ", error);
      setLoading(false);
    }
  };
  
  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {
              loading? <Col className='text-center' lg='12'><h5 className="fw-bold">Loading....</h5></Col>:<Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter UserName"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>
                <button type="submit" className="buy__btn auth__btn" disabled={loading}>
                  {loading ? "Creating Account..." : "Create an Account"}
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
