"use client";

import { Input, Select, SelectItem, Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostarAula({ userData, courses, onPost, type }) {
  const [qttInputs, setQttInputs] = useState(1);
  const [inputs, setInputs] = useState([1]);
  const [course, setCourse] = useState("");

  function handleAddInput() {
    setInputs([...inputs, qttInputs + 1]);
    setQttInputs(qttInputs + 1);
  }

  function handleSetCourse(e) {
    setCourse(e.target.value);
  }

  async function handlePostAula(e) {
    e.preventDefault();
    const nicks = [];
    const observacoes = e.target.observacoes.value;

    for (const input of inputs) {
      const nick = e.target[`aluno${input}`].value;
      console.log("nick: ", nick);
      if (nick) nicks.push(nick);
    }

    if (nicks.length === 0 || !course || !observacoes) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const res = await onPost({
      courseId: Number(course),
      nicks,
      observation: observacoes,
      userId: Number(userData._id),
    });
    console.log(res);

    if (res.ok) {
      toast.success(res.data.message);
      e.target.reset();
      setInputs([1]);
      setQttInputs(1);

      return;
    }

    toast.error(res.data.message);
  }

  return (
    <form
      onSubmit={handlePostAula}
      id="formAula"
      className={
        type !== "modal"
          ? "flex w-[300px] sm:w-[450px] flex-col gap-4"
          : "flex flex-col gap-4"
      }
    >
      {type !== "modal" ? (
        <h1 className="text-center text-2xl">Postar aula</h1>
      ) : null}
      <Select
        onChange={handleSetCourse}
        id="course"
        label="Selecione a aula"
        required
      >
        {courses.data.map((course) => (
          <SelectItem className="text-black" key={course.id} value={course.id}>
            {course.name}
          </SelectItem>
        ))}
      </Select>
      {inputs.map((input) => (
        <Input
          id={`aluno${input}`}
          key={input}
          label={`Nick do aluno ${input}`}
          type="text"
        />
      ))}
      <Textarea id="observacoes" label="Observações" required />

      {type !== "modal" ? (
        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center">
          <Button
            startContent={<FaPlus size={16} />}
            color="primary"
            onPress={handleAddInput}
          >
            Adicionar aluno
          </Button>
          <Button
            type="submit"
            endContent={<IoIosSend size={20} />}
            color="success"
          >
            Postar aula
          </Button>
        </div>
      ) : null}
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        closeOnClick
      />
    </form>
  );
}
