import React, { useState, useEffect } from "react";
import { Table, Button, Space, Typography, Modal } from "antd";
import "./index.css";

const { Title } = Typography;
const { confirm } = Modal;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // Simulated API call to fetch products
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setTotalProducts(data.length);
        setUniqueCategories([
          ...new Set(data.map((product) => product.category)),
        ]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    const filteredData = products.filter((product) => {
      const productName = product.title ? product.title.toLowerCase() : "";
      const productDescription = product.description
        ? product.description.toLowerCase()
        : "";
      return (
        productName.includes(filters.name.toLowerCase()) &&
        productDescription.includes(filters.description.toLowerCase()) &&
        (filters.category === "" || product.category === filters.category)
      );
    });
    setFilteredProducts(filteredData);
  }, [filters, products]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      className: "product-name-column",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "product-name-column",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "product-name-column",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </Space>
      ),
      className: "product-name-column",
    },
  ];

  const handleEdit = (record) => {
    console.log("Edit:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="product-page">
      <Title level={3} className="title">
        Product List
      </Title>
      <div className="header">
        <p>Total Products: {totalProducts}</p>
        <p>Unique Categories: {uniqueCategories.length}</p>
      </div>
      <div className="filter">
        <Title level={4}>Filters</Title>
        <input
          type="text"
          placeholder="Product Name"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={filters.description}
          onChange={(e) => handleFilterChange("description", e.target.value)}
        />
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="select"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <Title level={4} className="title">
          Product Table
        </Title>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          className="tabel"
        />
      </div>
    </div>
  );
};

export default ProductListPage;
