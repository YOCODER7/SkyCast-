import { History, Trash2 } from "lucide-react";

export default function SearchHistory({ history, onSelectCity, onDelete }) {
  return <section className="list-card history-card"><div className="section-heading"><div><p className="eyebrow">Recently viewed</p><h2>Search history</h2></div><History size={19} /></div>{history.length ? history.slice(0, 5).map((item) => <div className="history-row" key={item.id}><button className="history-city" onClick={() => onSelectCity(item.city)}><span>{item.city}</span><small>{item.searchAt ? new Date(item.searchAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Recent"}</small></button><button className="delete-button" onClick={() => onDelete(item.city)} aria-label={`Delete ${item.city} from search history`}><Trash2 size={16} /></button></div>) : <p className="list-empty">Your recent searches appear here.</p>}</section>;
}
