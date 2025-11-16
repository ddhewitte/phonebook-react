import {React, useEffect, useState} from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function App() {

  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetchPhoneBook();
  }, [])

  async function fetchPhoneBook(){
    const response = await axios.get(API_ENDPOINT);
    setPerson(response.data);
  }
  return (
    <div className="container">
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">

          <h1 className="text-2xl font-bold text-black mb-2">Phonebook App</h1>

          <div className="max-w-full p-4  bg-[#6a5269] rounded-md mb-2 gap-4 text-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="w-full bg-white rounded-sm text-black p-2" placeholder="Enter name.."></input>
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" className="w-full bg-white rounded-sm text-black p-2" placeholder="Enter phone number.."></input>
                </div>
              </div>

              <div className="mt-2">
                <button type="button" className="w-auto h-auto p-2 bg-black text-white rounded-md hover:bg-gray-800">Add to phonebook</button>
              </div>
          </div>

          <div className="max-w-full p-4 bg-white border border-gray-500 rounded-md mb-2 gap-4 text-white">
            <h2 className="font-bold text-black">Phonebook Lists</h2>

            {
              person.map((user) => (
                  <div className="flex justify-between items-center text-black p-2" key={user.id}>
                      <div>{user.id}</div>
                      <div>{user.name}</div>
                      <div>{user.phone_number}</div>
                      <div className="flex gap-2">
                        <button>
                          <Pencil className="w-4 h-4"></Pencil>
                        </button>

                        <button>
                          <Trash2 className="w-4 h-4 text-red-700"></Trash2>
                        </button>
                      </div>
                  </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
