/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditNote({ match }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });

  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
        console.log(match.params.id)
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data.id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };
        console.log(newNote)
        await axios.post(`/api/notes/${id}`, newNote, {
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
          <form onSubmit={editNote} autoComplete="off">
            <div className="input-fields">
              <div className="text-input-group">
                <input
                  type="title"
                  name="title"
                  id="create-title"
                  placeholder="Title"
                  required
                  onChange={onChangeInput}
                  value={note.title}
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
                  value={note.content}
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
                  value={note.date}
                />
              </div>
            </div>
            <p className="error-messenger"></p>
            <div className="card__footer">
              <button type="submit">
                <span>Edit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
