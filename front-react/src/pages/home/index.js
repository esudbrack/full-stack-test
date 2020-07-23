import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import api from "../../services/api";

const { Content } = Layout;

// table columns
const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tagline",
    dataIndex: "tagline",
    key: "tagline",
  },
  {
    title: "First Brewed",
    dataIndex: "first_brewed",
    key: "first_brewed",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

export default function Home() {
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 325, // Peguei manualmente da api, valor pode ser alterado caso adicionem mais dados
  });

  useEffect(() => {
    fetch(pagination);
  }, []);

  const fetch = (pagination) => {
    console.log(pagination);
    if (!pagination.current) pagination = pagination.pagination;
    setLoading(true);
    api
      .get(`/brews/${pagination.current}/${pagination.pageSize}`)
      .then((results) => {
        let { data } = results;
        setBrews(data);
        setLoading(false);
        setPagination(pagination);
      });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  return (
    <Layout>
      <Content>
        <Table
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={columns}
          dataSource={brews}
          bordered
        />
      </Content>
    </Layout>
  );
}
