import { useEffect, useState } from "react";
import "./App.css";
import Image from "./components/Image";

function App() {
  // States
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getImages();
  }, []);

  const ACCESS_KEY = "g8TGL0wWTXP-ZUyh8A-Ew-EVlV5byz8E3g3NBhgck8Y";

  const getImages = () => {
    fetch(`https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&per_page=50`)
      .then((response) => response.json())
      .then((images) => {
        setImages(images);
      });
  };

  const getSearchImages = async (e) => {
    e.preventDefault();
    setSearch("");
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${query}&per_page=30&orientation=landscape`
    );
    const images = await response.json();
    setImages(images.results);
  };

  const updateChange = (e) => {
    setSearch(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={getSearchImages} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          placeholder="Search Photos"
          onChange={updateChange}
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="container">
        <div className="parent">
          {images.map((image) => (
            <Image key={image.id} id={image.id} url={image.urls.small} />
          ))}
        </div>
      </div>
      <div className="footer">
        <p className="footer-text">
          Images Provided by{" "}
          <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
            <strong>Unsplash</strong>{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
