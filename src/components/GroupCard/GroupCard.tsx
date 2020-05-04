import React from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./GroupCard.scss";

const { Meta } = Card;

interface GroupCardProps {}

const GroupCard = (props: GroupCardProps) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<EditOutlined key="edit" />]}
    >
      <Meta style={{ fontSize: "10px" }} title="Card title" />
    </Card>
  );
};

export default GroupCard;
