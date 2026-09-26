import { LoaderCircle, Search } from "lucide-react";

export default function SearchBar({ query, onQueryChange, onSearch, loading, message }) {
  return <section className="hero"><p className="eyebrow">Live weather, beautifully clear</p><h1>Plan around the <em>sky.</em></h1><form className="search-form" onSubmit={(event) => { event.preventDefault(); onSearch(); }}><Search size={20} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search any city" aria-label="Search city" /><button type="submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={19} /> : "Search"}</button></form>{message && <p className="error-message">{message}</p>}</section>;
}
