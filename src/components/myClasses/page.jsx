import { ImBooks } from "react-icons/im";
import { PiStudent } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { TfiPencilAlt } from "react-icons/tfi";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function MyClasses({
  courses,
  myClasses,
  userData,
  getClasses,
  onEdit,
  onDelete,
}) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myClassesData, setMyClassesData] = useState(
    JSON.parse(JSON.stringify(myClasses.data))
  );

  const [type, setType] = useState("");
  const [classData, setClassData] = useState();
  const [course, setCourse] = useState();
  const [observation, setObservation] = useState();
  const [nickname, setNickname] = useState([]);
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [qttAlunos, setQttAlunos] = useState([1]);

  async function handleModal(e) {
    setType(e.target.getAttribute("data-type"));

    const classData2 = myClassesData.classes.find(
      (myClass) => myClass.id === Number(e.target.getAttribute("data-classid"))
    );

    let i = 0;

    const nicks = classData2.nickname.split(",");
    const nicknameMap = {};

    for await (const nick of nicks) {
      setQttAlunos([...qttAlunos, qttAlunos.length + 1]);
      nicknameMap[i] = nick;
      i++;
    }

    setNickname(nicknameMap);
    setData(new Date(classData2.createdAt).toISOString().split("T")[0]);
    setObservation(classData2.observation);
    setClassData(classData2);
    onOpen();
  }

  function handleSetCourse(e) {
    setCourse(e.target.value);
  }

  async function handleSelectPage(e) {
    setIsLoading(true);
    const offset = e === 1 ? 0 : (e - 1) * 5;

    const res = await getClasses({
      userId: userData._id,
      offset,
    });

    setMyClassesData(res.data);
    setIsLoading(false);
  }

  async function handlePostAula(e) {
    e.preventDefault();
    const nicks = [];
    const observacoes = e.target.observacoes.value;

    for (const input of qttAlunos) {
      const nick = e.target[`aluno${input}`].value;
      if (nick) nicks.push(nick);
    }

    if (nicks.length === 0 || !observacoes || !data) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const res = await onEdit({
      classId: Number(classData.id),
      courseId: course ? Number(course) : classData.courses.id,
      nicks,
      observation: observacoes,
      userId: Number(userData._id),
      data: data,
    });
    console.log(res);

    if (res.ok) {
      toast.success(res.data.message);
      e.target.reset();

      handleCloseModal();
      router.refresh();
      return;
    }

    toast.error(res.data.message);
  }

  function handleCloseModal() {
    onClose();

    setData("");
    setQttAlunos([1]);
    setNickname([]);
    setObservation("");
    setClassData();
  }

  async function handleDeleteAula() {
    console.log(classData);
    const res = await onDelete({
      classId: Number(classData.id),
      userId: Number(userData._id),
    });
    console.log(res);

    if (res.ok) {
      toast.success(res.data.message);
      handleCloseModal();

      router.refresh();
      return;
    }

    toast.error(res.data.message);
  }

  return (
    <>
      <Modal isOpen={isOpen} size="md" onClose={handleCloseModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                {type === "edit" ? "Editar aula" : "Excluir aula"}
              </ModalHeader>
              <ModalBody>
                {type === "edit" ? (
                  <form
                    onSubmit={handlePostAula}
                    className="flex flex-col gap-4"
                  >
                    <Select
                      onChange={handleSetCourse}
                      label="Selecione a aula"
                      placeholder={classData.courses.name}
                      required
                    >
                      {courses.data.map((course) => (
                        <SelectItem
                          className="text-black"
                          key={course.id}
                          value={course.id}
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </Select>
                    {qttAlunos.map((aluno) => (
                      <Input
                        key={`aluno${aluno}`}
                        type="text"
                        id={`aluno${aluno}`}
                        value={nickname[aluno - 1]}
                        label={`Nick do aluno ${aluno}`}
                        onChange={(e) =>
                          setNickname({
                            ...nickname,
                            [aluno - 1]: e.target.value,
                          })
                        }
                        required
                      />
                    ))}
                    <Button
                      color="primary"
                      onPress={() =>
                        setQttAlunos([...qttAlunos, qttAlunos.length + 1])
                      }
                    >
                      Adicionar aluno
                    </Button>
                    <Textarea
                      onChange={(e) => setObservation(e.target.value)}
                      id="observacoes"
                      value={observation}
                      label="Observações"
                      required
                    />
                    <Input
                      onChange={(e) => setData(e.target.value)}
                      id="date"
                      type="date"
                      label="Data da aula"
                      value={data}
                      required
                    />
                    <div className="flex justify-end gap-4">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button type="submit" color="primary">
                        {type === "edit" ? "Editar" : "Excluir"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <span className="text-black">
                    Tem certeza que deseja excluir essa postagem de aula?
                  </span>
                )}
              </ModalBody>
              {type !== "edit" ? (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button onPress={handleDeleteAula} color="primary">
                    {type === "edit" ? "Editar" : "Excluir"}
                  </Button>
                </ModalFooter>
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-center">Minhas últimas aulas</h1>
        <div className="flex gap-4 justify-center flex-wrap">
          {myClassesData.classes.length > 0 ? null : (
            <div className="flex flex-col gap-2">
              <span className="text-center text-small text-gray-500">
                Oops! Parece que você ainda não aplicou nenhuma aula. Assim que
                postar sua primeira aula, ela aparecerá aqui!
              </span>
            </div>
          )}
          {myClassesData.classes.map((myClass) => (
            <div
              key={myClass.id}
              className="flex text-black flex-col gap-4 w-[380px] bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex gap-2 flex-wrap items-center">
                <ImBooks size={24} />
                <h1 className="text-xl">{myClass.courses.name}</h1>
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <PiStudent
                  color="rgb(107 114 128 / var(--tw-text-opacity, 1))"
                  size={24}
                />
                <span className="text-small text-gray-500">
                  Alunos: {myClass.nickname}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <FaCalendarAlt
                  color="rgb(107 114 128 / var(--tw-text-opacity, 1))"
                  size={20}
                />
                <span className="text-small text-gray-500">
                  Data:{" "}
                  {new Date(myClass.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                <TfiPencilAlt
                  color="rgb(107 114 128 / var(--tw-text-opacity, 1))"
                  size={24}
                />
                <span className="text-small text-gray-500">
                  Observações: {myClass.observation}
                </span>
              </div>
              <div className="flex justify-center gap-2 align-bottom ">
                <Button
                  data-classid={myClass.id}
                  data-type="edit"
                  onPress={handleModal}
                  startContent={<FaPencilAlt size={16} />}
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  data-classid={myClass.id}
                  data-type="delete"
                  onPress={handleModal}
                  startContent={<FaTrashAlt size={16} />}
                  color="danger"
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {myClassesData ? (
            <Pagination
              isDisabled={isLoading}
              onChange={handleSelectPage}
              total={myClassesData.total}
            />
          ) : null}
        </div>

        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={5000}
          closeOnClick
        />
      </div>
    </>
  );
}
