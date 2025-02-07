"use client";

import { useState } from "react";

export default function NewPost() {

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function createPost(event: React.FormEvent) {
    event.preventDefault();

    let hasError = false;

    if (formData.title.trim() === "") {
      setTitleError("Je nutné vyplnit titulek.");
      hasError = true;
    } else if (formData.title.length < 3) {
      setTitleError("Titulek musí mít minimálně 3 znaky.");
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (formData.content.trim() === "") {
      setContentError("Je nutné vyplnit obsah.");
      hasError = true;
    } else if (formData.content.length < 20) {
      setContentError("Obsah musí mít minimálně 20 znaků.");
      hasError = true;
    } else {
      setContentError(null);
    }

    if (formData.author.trim() === "") {
      setAuthorError("Je nutné vyplnit autora.");
      hasError = true;
    } else {
      setAuthorError(null);
    }

    if (hasError) {
      setSuccess(null);
      return;
    }

    const response = await fetch("/api/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      setTitleError(result.error || "Neznámá chyba");
      setSuccess(null);
    } else {
      setSuccess("Příspěvek byl úspěšně přidán!");
      setTitleError(null);
      setContentError(null);
      setAuthorError(null);
      setFormData({ title: "", content: "", author: "" });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div className="max-w-[37rem] mt-[3rem] mx-auto">
      {!success ? 
      <form onSubmit={createPost} className="flex flex-col" aria-labelledby="form-title" aria-describedby="form-description">
        <div className="flex flex-col mb-6">
          <label className="text-sm" style={{ color: "var(--font-dark)" }}>Titulek</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            className="border border-solid border-grey-600 rounded-md p-3" aria-invalid={!!titleError} aria-describedby="title-error"/>
            {titleError && <span className="text-red-500 text-sm">{titleError}</span>}
        </div>
        <div className="flex flex-col mb-6">
        <label className="text-sm" style={{ color: "var(--font-dark)" }}>Obsah</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required 
          className="border border-solid border-grey-600 rounded-md p-3 h-[14rem]" aria-invalid={!!contentError} aria-describedby="content-error"/>
          {contentError && <p className="text-red-500 text-sm">{contentError}</p>}
        </div>
        <div className="flex flex-col mb-12">
        <label className="text-sm" style={{ color: "var(--font-dark)" }}>Autor</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required 
          className="border border-solid border-grey-600 rounded-md p-3" aria-invalid={!!authorError} aria-describedby="author-error"/>
          {authorError && <p className="text-red-500 text-sm">{authorError}</p>}
        </div>
        <div className="mb-3"><button type="submit">Odeslat</button></div>
      </form>
      : 
        <p>{success}</p>
      }
    </div>
  );
}