import Login from '../components/Login';
import Register from '../components/Register';
import "../fonts/css/supreme.css";

function Welcome() {
  return (
    <div className='max-w-[80vw] min-h-[70vh] flex mx-auto mt-14 justify-center items-center'>
      <Register />
      <Login />
    </div>
  )
}

export default Welcome
