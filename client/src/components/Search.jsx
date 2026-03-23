import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router";
const Search = ({ ...props }) => {
  const [text, setText] = useState("");
  const input = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    let url = "/productos";
    let query = new URLSearchParams({ q: text });
    return navigate(`${url}?${query.toString()}`);
  };

  useEffect(() => {
    if (location.search) {
      const query = new URLSearchParams(location.search);
      setText(query.get("q"));
    }
  }, [location]);

  return (
    <form onSubmit={handleSearch} method="get" {...props}>
      <input
        placeholder="Buscar producto"
        type="text"
        ref={input}
        onChange={() => setText(input.current.value)}
      />
      <button>
        <Icon icon={"mdi:search"} />
      </button>
    </form>
  );
};

export default Search;
