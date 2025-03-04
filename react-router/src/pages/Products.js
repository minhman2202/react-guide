import {Link} from 'react-router-dom'

const PRODUCTS = [
  {id: 1, title: 'A Book'},
  {id: 2, title: 'A Carpet'},
  {id: 3, title: 'An Online Course'}
];

export default function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>);
}