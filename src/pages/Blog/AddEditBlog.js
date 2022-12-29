import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Blog.scss'
import {AiFillFolderAdd } from 'react-icons/ai';
const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({user,setActive}) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                toast.info("Upload is " + progress + "% done");
                break;
              case "running":
                console.log("Upload is running");
                toast.info("Upload is " + progress + "% done");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              toast.info("Image upload to firebase successfully");
              setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
            });
          }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };
  return(
      <div className="new">
        <div className="newContainer">
          <div className="relative top">
            <h1 className="text-black">{title}</h1>
            <button className="absolute right-3 top-2 create" onClick={handleSubmit} disabled={progress !== null && progress < 100} type="submit">
              {id ? "Update Blog" : "Create Blog"}
            </button>
          </div>
          <div className="bottom">
            <div className=" relative left">
              <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} className="w-50" alt="" />
              <div >
                <label htmlFor="file" className="absolute right-8 top-60">
                  <AiFillFolderAdd className={`dark:fill-white icon fill-gray-700`} size="40"/>
                </label>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" id="file" style={{ display: 'none' }} />
              </div>
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label>Title</label>
                  <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Title"
                      name="title"
                      value={title}
                      onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Tag</label>
                  <ReactTagInput
                      tags={tags}
                      placeholder="Tags"
                      onChange={handleTags}
                  />
                </div>
                <div className="d-flex flex-column fromInput">
                  <label>Is trendding?</label>
                 <div>
                   <input
                       type="radio"
                       className="form-check-input"
                       value="yes"
                       name="radioOption"
                       checked={trending === "yes"}
                       onChange={handleTrending}
                   />
                   <label htmlFor="radioOption" className="form-check-label">
                     Yes&nbsp;
                   </label>
                   <input
                       type="radio"
                       className="form-check-input"
                       value="no"
                       name="radioOption"
                       checked={trending === "no"}
                       onChange={handleTrending}
                   />
                   <label htmlFor="radioOption" className="form-check-label">
                     No
                   </label>
                 </div>
                </div>
                <div className="formInput">
                  <label>Category</label>
                  <select
                      value={category}
                      onChange={onCategoryChange}
                      className="catg-dropdown"
                  >
                    <option>Please select category</option>
                    {categoryOption.map((option, index) => (
                        <option value={option || ""} key={index}>
                          {option}
                        </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                      className="form-control description-box"
                      placeholder="Description"
                      value={description}
                      name="description"
                      onChange={handleChange}
                  />
                </div>
                <ToastContainer/>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
export default AddEditBlog