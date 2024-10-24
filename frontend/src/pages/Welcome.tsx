import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Register from '../components/Register';
import "../fonts/css/supreme.css";

function Welcome() {
  return (
    <div 
      style={{ fontFamily: 'Supreme-Regular' }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
    >
        <Navbar />
        <div className='max-w-[80vw] min-h-[70vh] flex mx-auto mt-14 justify-center items-center '>
          <Register />
          <Login />
        </div>
    </div>
  )
}

export default Welcome
