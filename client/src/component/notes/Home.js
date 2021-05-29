/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {}
  };

  return (
    <div>
      {notes.length === 0 ? (
        <p className="notify">
          You haven't notes!
          <span className="notify-span">
            <Link to="/create">Create now</Link>
          </span>
        </p>
      ) : (
        <div className="container-note content">
          {notes.map((note) => (
            <div className="card-note" key={note._id}>
              <div className="card-header">
                <h4 title={note.title}>{note.title}</h4>
                <i
                  className="fas fa-times"
                  onClick={() => deleteNote(note._id)}></i>
              </div>
              <div className="text-wrapper">
                <p>{note.content}</p>
              </div>
              <p className="date">{format(note.date)}</p>
              <div className="card-footer">
                <button className="btnLogout">
                  <span>
                    <Link to={`edit/${note._id}`}>
                      <i className="fas fa-pencil-alt"></i>
                    </Link>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
