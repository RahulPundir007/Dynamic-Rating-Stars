import "./styles.css";
import { useState } from "react";

let messagesArr = ["Worst", "Bad", "Decent", "Good", "Awesome"];
let emojiArr = ["😞", "😣", "🙁", "🙂", "😘"];
export default function App() {
  return (
    <div>
      <Ratings maxStars={10} color="red" size={50} />
      <Ratings maxStars={5} color="purple" size={48} messages={emojiArr} />

      {/* <RatingsContainer messagesArr={messagesArr} /> */}
    </div>
  );
}

const ratingsContainer = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const stars = {
  display: "flex"
};

const RatingsContainer = (messages) => {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <Ratings
        maxStars={6}
        color="green"
        size={28}
        messagesArr={messagesArr}
        setParentRating={setRating}
      />
      <p>
        Selected Rating:{" "}
        {rating > 0 && messagesArr.length >= rating
          ? messagesArr[rating - 1]
          : rating}
      </p>
    </div>
  );
};

function Ratings({
  maxStars = 5,
  color = "purple",
  size = 48,
  messages = [],
  setParentRating
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function updateRatings(val) {
    if (val < 0 || val > maxStars) return;
    setRating(val);
    setParentRating(val);
  }

  function mouseEnter(val) {
    if (val < 0 || val > maxStars) return;
    setTempRating(val);
  }

  function mouseLeave() {
    setTempRating(0);
  }

  return (
    <div style={ratingsContainer}>
      <div style={stars}>
        {Array.from({ length: maxStars }, (e, idx) => (
          <Star
            key={idx}
            rating={rating}
            updateRatings={updateRatings}
            color={color}
            size={size}
            idx={idx + 1}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            tempRating={tempRating}
          />
        ))}
      </div>
      <p>
        {tempRating
          ? tempRating > 0 && messages.length >= tempRating
            ? messages[tempRating - 1]
            : tempRating
          : rating > 0 && messages.length >= rating
          ? messages[rating - 1]
          : rating}
      </p>
    </div>
  );
}

function Star({
  color,
  size,
  updateRatings,
  idx,
  rating,
  mouseEnter,
  mouseLeave,
  tempRating
}) {
  const style = {
    color,
    height: `${size}px`,
    width: `${size}px`
  };
  const isFilled = tempRating ? tempRating >= idx : rating >= idx;
  return (
    <span
      style={style}
      onClick={() => updateRatings(idx)}
      onMouseOver={() => mouseEnter(idx)}
      onMouseLeave={mouseLeave}
    >
      {isFilled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
