import {React, useEffect, useState} from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function App() {

  const [person, setPerson] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [button, setButton] = useState('add');
  const [existingId, setExistingId] = useState(0);

  useEffect(() => {
    fetchPhoneBook();
  }, [])

  //display data
  async function fetchPhoneBook(){
    const response = await axios.get(API_ENDPOINT);
    setPerson(response.data);
  }

  const actionCheck = async (e) => {
    e.preventDefault();
    if(button === 'add') {
      await addPerson(e);
    }else{
      await editPersonToAPI(e);
    }
  }

  //add data
  const addPerson = async (e) => {
    e.preventDefault();
    if(!name || !phone) return;
    const responseAdd = await axios.post(API_ENDPOINT, { name, phone});
    if(responseAdd){
      emptyStateAll();
    }
  }

  //edit data - set existing
  const editPerson = (user) => {
    setName(user.name);
    setPhone(user.phone);
    setExistingId(user.id);
    setButton('edit');
  }

  const editPersonToAPI = async (e) => {
    if(!name || !phone) return;
    const updateData = await axios.put(API_ENDPOINT + '/' + existingId, {name, phone})
    if(updateData) emptyStateAll();
  }

  const emptyStateAll = () => {
    setName('');
    setPhone('');
    fetchPhoneBook();
    setExistingId(0);
    setButton('add');
  }

  const deleteDataToAPI = async (user) => {
    const confirm = window.confirm("Yakin mau hapus data phone book ini?");
    if(!confirm) return;

    const deleteData = await axios.delete(API_ENDPOINT + '/' + user.id);
    if(deleteData) emptyStateAll();
  }

  return (
    <div className="container">
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">

          <h1 className="text-2xl font-bold text-black mb-2">Phonebook App</h1>

          <div className="max-w-full p-4  bg-[#6a5269] rounded-md mb-2 gap-4 text-white">
            <form onSubmit={actionCheck}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                      className="w-full bg-white rounded-sm text-black p-2" 
                      placeholder="Enter name.." >
                    </input>
                  </div>
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white rounded-sm text-black p-2" 
                      placeholder="Enter phone number.." ></input>
                  </div>
              </div>

              <div className="mt-2">
                <button 
                  type="submit" 
                  className="w-auto h-auto p-2 bg-black text-white rounded-md hover:bg-gray-800">
                  {button} to phonebook
                </button>
              </div>
              </form>
          </div>

          <div className="max-w-full p-4 bg-white border border-gray-500 rounded-md mb-2 gap-4 overflow-x-auto text-white">
            <h2 className="font-bold text-black">Phonebook Lists</h2>

            {
              person.map((user) => (
                  <div className="grid grid-cols-4 gap-30 text-black p-2 border-b border-gray-300" key={user.id}>
                      <div>{user.id}</div>
                      <div>{user.name}</div>
                      <div>{user.phone}</div>
                      <div className="flex gap-2">
                        <button>
                          <Pencil className="w-4 h-4 cursor-pointer" onClick={() => editPerson(user)}></Pencil>
                        </button>

                        <button>
                          <Trash2 className="w-4 h-4 text-red-700 cursor-pointer" onClick={ () => deleteDataToAPI(user) }></Trash2>
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
