import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function PwReset() {
  const { msg,resetPassword } = useContext(UserContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    resetPassword(data.get('email'))

  }
  return (

    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-semibold mb-4">Jelszó módosítás</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label text-white">E-mail</label>
              <input
                type="email"
                name='email'
                placeholder="Adja meg az e-mail címét"
                className="input input-bordered w-full bg-white text-black"
              />
            </div>
            
            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full" >Új jelszó igénylése</button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Már van fiókja? <a href="/login" className="link link-primary">Bejelentkezés</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}
