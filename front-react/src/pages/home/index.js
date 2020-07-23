import React, { useState, useEffect } from "react";
import { Layout, Table, Space, Modal, Card, Typography } from "antd";
import api from "../../services/api";
import { Redirect } from "react-router";

const { Content, Header } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const [redirect, setRedirect] = useState(false);
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(false);
  // Modal
  const [beer, setBeer] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  // Pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 80],
    total: 325, // Peguei manualmente da api, valor pode ser alterado caso adicionem mais dados
  });

  useEffect(() => {
    fetch(pagination);
  }, []);

  const fetch = (pagination) => {
    if (!pagination.current) pagination = pagination.pagination;
    setLoading(true);
    api
      .get(`/brews/${pagination.current}/${pagination.pageSize}`)
      .then((results) => {
        let { data } = results;
        setBrews(data);
        setLoading(false);
        setPagination(pagination);
      })
      .catch((e) => {
        localStorage.clear();
        setRedirect(true);
      });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const openModal = (beer) => {
    console.log(beer);
    setBeer(beer);
    setModalOpen(true);
  };

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
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              openModal(record);
            }}
          >
            {text}
          </a>
        </Space>
      ),
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

  return (
    <>
      {redirect ? (
        <Redirect to="/login" />
      ) : (
        <Layout>
          <Header style={{ color: "white" }}>Beer Listing</Header>
          <Content
            style={{ marginLeft: "5vw", marginRight: "5vw", marginTop: "20px" }}
          >
            <Space direction="vertical">
              <Table
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                columns={columns}
                dataSource={brews}
                bordered
              />
            </Space>
            <Modal
              title={beer.name}
              visible={modalOpen}
              footer={null}
              onOk={() => {
                setModalOpen(false);
              }}
              onCancel={() => {
                setModalOpen(false);
              }}
            >
              <Card
                style={{ textAlign: "-webkit-center" }}
                cover={
                  <img
                    alt="example"
                    style={{
                      maxHeight: "350px",
                      width: "auto",
                    }}
                    src={beer.image_url}
                  />
                }
              >
                {beer.food_pairing && beer.food_pairing.length > 0 && (
                  <>
                    <Title level={4}>Food Pairing</Title>
                    <Space direction="vertical">
                      {beer.food_pairing.map((food) => (
                        <Text>{food}</Text>
                      ))}
                    </Space>
                  </>
                )}
                {/* <Title style={{ marginTop: "10px" }} level={4}>
                  Brewer Tips
                </Title>
                <Space direction="vertical">
                  <Text>{beer.brewers_tips}</Text>
                </Space> */}
              </Card>
            </Modal>
          </Content>
        </Layout>
      )}
    </>
  );
}
