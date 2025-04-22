import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Deleted!');
    } catch (error) {
      toast.error('Failed to delete product.');
    }
  };

  return (
    <section>
      <Container>
        <Row lg="12">
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold">Loading...</h4>
                ) : productsData.length === 0 ? (
                  <h5 className="py-5 text-center">No Products Found</h5>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imgUrl}
                          // alt={}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
