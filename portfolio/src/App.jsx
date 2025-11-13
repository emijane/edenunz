import './App.css'
import icon from './assets/icon.jpg'

function App() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className="flex flex-row items-center gap-6 p-6">
          <img src={icon} alt="Icon" className='w-40 rounded-full'/>
          <div className='text-left'>
            <h1 className="text-3xl text-white text-glow">Emma DeNunzio</h1>
            <p className='text-lg text-white'>Frontend Developer | CS @ UF</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
