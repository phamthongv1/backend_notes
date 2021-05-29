/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    console.log(e)
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };
        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });
        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="container-create">
      <div className="card create-card">
        <div className="card__content">
          <h3 className="card__title">Create Note</h3>
          <form onSubmit={createNote} autoComplete="off">
            <div className="input-fields">
              <div className="text-input-group">
                <input
                  type="title"
                  name="title"
                  id="create-title"
                  placeholder="Title"
                  required
                  onChange={onChangeInput}
                />
                <label htmlFor="title">Tittle</label>
              </div>
            </div>
            <div className="input-fields">
              <div className="text-input-group">
                <textarea
                  type="content"
                  name="content"
                  id="create-content"
                  placeholder="Content"
                  required
                  rows="10"
                  onChange={onChangeInput}
                />
                <label htmlFor="content">Content</label>
              </div>
            </div>
            <div className="input-fields">
              <div className="text-input-group">
                <input
                  type="date"
                  name="date"
                  id="create-date"
                  placeholder="date"
                  required
                  autoComplete="true"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <p className="error-messenger"></p>
            <div className="card__footer">
              <button type="submit">
                <span>Create</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
