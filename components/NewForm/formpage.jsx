import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import styles from "@/styles/Form.module.css";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FormPage = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  // const handleAdd = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await createUserWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password
  //     );
  //     await setDoc(doc(db, "users", res.user.uid), {
  //       ...data,
  //       timeStamp: serverTimestamp(),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
      const formData = {
        name: data.name,
        image: data.img, 
        course: data.course, 
        year: data.year, 
        location: data.location, 
        phone: data.phone, 
        company: data.company, 
        designation: data.designation, 
        industry: data.industry, 
        offers: data.offers, 
        linkedin: data.linkedin, 
        website: data.website, 
              
      };
  
      // Send a POST request to your MongoDB server
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`, formData)
        .then((response) => {
          console.log("Profile data added successfully to MongoDB!");
        })
        .catch((error) => {
          console.error("Error adding profile data to MongoDB: ", error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <img className={styles.image}
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="image"
          />
        </div>
        <div className={styles.right}>
          <form onSubmit={handleAdd} className={styles.form}>
            <div className={styles.forminput}>
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className={styles.icon}/>
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            {inputs.map((input) => (
              <div className={styles.forminput} key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button disabled={per !== null && per < 100} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;