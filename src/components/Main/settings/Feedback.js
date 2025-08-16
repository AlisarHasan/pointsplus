import React, { useState } from "react";
import "../../../styles/feedback.css"

const Feedback = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("suggestion");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      id: Date.now(),
      title,
      message,
      category,
      imageName: image?.name || null,
    };

    console.log("Feedback submitted:", feedback);
    localStorage.setItem("userFeedback", JSON.stringify(feedback));

    setSubmitted(true);
    setTitle("");
    setMessage("");
    setCategory("suggestion");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-wrapper">
        <h2 className="feedback-title">Send your comment or question</h2>

        {submitted ? (
          <div className="feedback-success">Note sent, Thank you.</div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <select
              className="feedback-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="suggestion">Suggestion</option>
              <option value="problem">Problem</option>
              <option value="question">Question</option>
              <option value="other">Another thing</option>
            </select>

            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="feedback-input"
              required
            />

            <textarea
              placeholder="Write your comment or question here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="feedback-textarea"
              rows="6"
              required
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="feedback-file"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="feedback-image-preview"
              />
            )}

            <button type="submit" className="feedback-submit">
              send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


export default Feedback;