import { useRef, useState } from "react";
import { BsUpload, BsXLg } from "react-icons/bs";

import { convertToBase64 } from "../../utils/imageHelpers";
import noPic from "../../assets/profile.png";

const UploadPhoto = ({ onGetImage }) => {
    const imagePicker = useRef();
    const [image, setImage] = useState("");

    const pickImageHandler = () => {
        imagePicker.current.click();
    }

    const pickedHandler = async (e) => {
        console.log(e.target.files);
        const selectedImage = e.target.files[0];
        const base64String = await convertToBase64(selectedImage);
        onGetImage(base64String);
        setImage(selectedImage);
    }

    const removeImage = () => {
        setImage("");
    }

    return (
        <>
            <div>
                <div>
                    <input
                        type="file"
                        id="image"
                        hidden
                        onChange={pickedHandler}
                        ref={imagePicker}
                        accept="image/png, image/jpeg"
                    />
                </div>
                <div>
                    <div>
                        {/* no image selected */}
                        {
                            !image && (
                                <div>
                                    <img
                                        alt="User preview image"
                                        src={noPic}
                                        height="96"
                                        width="96"
                                        className="mb-3 rounded-full shadow-lg"
                                    />
                                </div>
                            )
                        }
                        {/* image selected */}
                        {
                            image && (
                                <div className="preview-box">
                                    <div
                                        style={{
                                            backgroundImage: `url(${URL.createObjectURL(image)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '100px',
                                            height: '100px',
                                            borderRadius:'50%',
                                        }}
                                        className="mb-3 shadow-lg"
                                    ></div>
                                    {/* <img
                                        src={URL.createObjectURL(image)} alt="preview"
                                        className="mb-3 rounded-full shadow-lg"
                                    /> */}
                                    <button type="button" onClick={removeImage}>
                                        <BsXLg />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <button
                            onClick={pickImageHandler}
                            type="button"
                            className='btn font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'>
                            <BsUpload className="w-4 h-4 me-2" />
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UploadPhoto;