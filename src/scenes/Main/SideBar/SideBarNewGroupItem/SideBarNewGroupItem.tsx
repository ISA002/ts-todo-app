import React from "react";
import { Menu, Button, Input } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import TodosStore from "../../../../store/stores/todosStore";
import { TodoGroup } from "../../../../store/types";

interface SideBarNewGroupItemProps {
  todosStore: TodosStore;
  id: number;
  deletefun: (id: number) => void
}

const SideBarNewGroupItem = (props: SideBarNewGroupItemProps) => {
  const [groupTitle, setGroupTitle] = React.useState<string>("");
  const onCreateGroup = () => {
    console.log(groupTitle);
    props.todosStore.createGroup(groupTitle);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupTitle(event.target.value);
    console.log(groupTitle);
  };

  return (
    <>
      <Input
        placeholder="New group title"
        value={groupTitle}
        onChange={onInputChange}
      />
      <Button
        style={{
          borderRadius: "20px",
          border: "none",
          float: "right",
          background: "none",
        }}
        icon={<CloseOutlined />}
        onClick={() => props.deletefun(props.id)}
      ></Button>
      <Button
        style={{
          borderRadius: "20px",
          border: "none",
          float: "right",
          background: "none",
        }}
        icon={<CheckOutlined />}
        onClick={onCreateGroup}
      ></Button>
    </>
  );
};

export default SideBarNewGroupItem;
