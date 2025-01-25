"use client";

import { useUser } from "@/contexts/userContext/userContext";
import PostarAula from "@/components/postarAula/page";
import MyClasses from "@/components/myClasses/page";

export default function DpEPage() {
  const {
    userData,
    permissions,
    courses,
    myClasses,
    onPostClass,
    getMyClasses,
    onEditClass,
    onDeleteClass,
  } = useUser();

  return (
    <>
      <div className="flex flex-col p-4 justify-center items-center">
        <PostarAula
          userData={userData}
          courses={courses}
          onPost={onPostClass}
          type={"page"}
        />
      </div>

      <div className="flex flex-col gap-4 justify-center p-4">
        <MyClasses
          courses={courses}
          myClasses={myClasses}
          onPost={onPostClass}
          userData={userData}
          getClasses={getMyClasses}
          onEdit={onEditClass}
          onDelete={onDeleteClass}
        />
      </div>
    </>
  );
}
